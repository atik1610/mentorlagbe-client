"use client";
import {createContext,useContext,useEffect,useState,useCallback,ReactNode} from "react";
import {useRouter} from "next/navigation";
import {api,API_URL,dashboardRoute} from "@/lib/api";
import type {User} from "@/lib/types";

type Notice={id:number;type:"success"|"error";message:string};
type AuthState={user:User|null;loading:boolean;refresh:()=>Promise<void>;signOut:()=>Promise<void>};
const AuthCtx=createContext<AuthState|undefined>(undefined);
const ToastCtx=createContext<(message:string,type?:"success"|"error")=>void>(()=>{});
export function useAuth(){const value=useContext(AuthCtx);if(!value)throw new Error("AuthProvider missing");return value;}
export function useToast(){return useContext(ToastCtx);}
export function Providers({children}:{children:ReactNode}){
 const router=useRouter();const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true),[notices,setNotices]=useState<Notice[]>([]);
 const toast=useCallback((message:string,type:"success"|"error"="success")=>{
  const id=Date.now()+Math.random();setNotices(old=>[...old,{id,type,message}]);
  setTimeout(()=>setNotices(old=>old.filter(n=>n.id!==id)),4400);
 },[]);
 const refresh=useCallback(async()=>{
  try{
   const session=await fetch(`${API_URL}/api/auth/get-session`,{credentials:"include",cache:"no-store"}).then(r=>r.ok?r.json():null);
   if(!session?.user){setUser(null);return;}
   const result=await api<{user:User}>("/api/me",{auth:true});setUser(result.user);
  }catch{setUser(null);}
 },[]);
 useEffect(()=>{let active=true;const load=async()=>{await refresh();if(active)setLoading(false);};void load();return()=>{active=false;};},[refresh]);
 useEffect(()=>{
  const preference=localStorage.getItem("mentorlagbe-theme")||"light";
  document.documentElement.setAttribute("data-theme",preference);
 },[]);
 const signOut=async()=>{
  try{await api("/api/auth/sign-out",{method:"POST",body:{}});}catch{}
  setUser(null);toast("Signed out successfully");router.push("/");router.refresh();
 };
 return <ToastCtx.Provider value={toast}><AuthCtx.Provider value={{user,loading,refresh,signOut}}>{children}
   <div className="toast-stack" role="status" aria-live="polite">{notices.map(n=><div className={`toast ${n.type}`} key={n.id}><span>{n.type==="success"?"✓":"!"}</span>{n.message}</div>)}</div>
 </AuthCtx.Provider></ToastCtx.Provider>;
}
export function ThemeToggle(){const [dark,setDark]=useState(false);
 useEffect(()=>{void Promise.resolve().then(()=>setDark(document.documentElement.getAttribute("data-theme")==="dark"));},[]);
 const toggle=()=>{const next=!dark;setDark(next);document.documentElement.setAttribute("data-theme",next?"dark":"light");localStorage.setItem("mentorlagbe-theme",next?"dark":"light");};
 return <button className="icon-button" type="button" title="Toggle dark and light theme" aria-label="Toggle theme" onClick={toggle}>{dark?"☀":"☾"}</button>;
}
export function SessionGate({role,children}:{role?:string;children:ReactNode}){
 const {user,loading}=useAuth();
 if(loading)return <div className="gate-loading"><div className="skeleton h24"/><div className="skeleton h36"/><p>Checking your session…</p></div>;
 if(!user)return <div className="empty-state"><h2>Sign in to continue</h2><p>Your session is required for this page.</p><a className="button button-primary" href="/sign-in">Go to Sign In</a></div>;
 if(role && user.role!==role)return <div className="empty-state"><h2>Access restricted</h2><p>This page is only available to {role}s.</p><a className="button button-outline" href={dashboardRoute(user.role)}>My Dashboard</a></div>;
 return <>{children}</>;
}

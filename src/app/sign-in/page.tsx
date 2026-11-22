"use client";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {api,dashboardRoute} from "@/lib/api";
import {useToast,useAuth} from "@/components/Providers";
export default function SignIn(){const router=useRouter(),toast=useToast(),{refresh}=useAuth();const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[busy,setBusy]=useState(false);
 const submit=async(e:React.FormEvent)=>{e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!password){toast("Enter a valid email and password","error");return;}setBusy(true);try{await api("/api/auth/sign-in/email",{method:"POST",body:{email,password}});await refresh();const me=await api<{user:{role:string}}>("/api/me",{auth:true});toast("Signed in successfully");router.push(dashboardRoute(me.user.role));}catch(err){toast(err instanceof Error?err.message:"Sign-in failed","error");}finally{setBusy(false);}};
 return <section className="auth-section"><div className="auth-card"><span className="eyebrow">WELCOME BACK</span><h1>Sign in to continue.</h1><p>Pick up right where your learning journey left off.</p><form className="auth-form" onSubmit={submit}><label className="form-field">Email address<input className="form-input" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="form-field">Password<input className="form-input" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button type="submit" className="button button-primary button-full" disabled={busy}>{busy?"Signing in…":"Sign In →"}</button></form><div className="auth-foot">New to MentorLagbe? <Link className="button-link" href="/sign-up">Create an account</Link></div></div></section>;
}

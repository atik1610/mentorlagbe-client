"use client";
import {ReactNode,useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {SessionGate,useAuth} from "./Providers";
import type {Role} from "@/lib/types";
const menus:Record<Role,{href:string;label:string;symbol:string}[]>={
 student:[{href:"/dashboard/student",label:"Overview",symbol:"▦"},{href:"/dashboard/student/my-applications",label:"My Applications",symbol:"✉"},{href:"/dashboard/student/saved",label:"Saved Tuitions",symbol:"♡"}],
 tutor:[{href:"/dashboard/tutor",label:"Overview",symbol:"▦"},{href:"/dashboard/tutor/post-tuition",label:"Post a Tuition",symbol:"＋"},{href:"/dashboard/tutor/my-tuitions",label:"My Tuitions",symbol:"⌗"},{href:"/dashboard/tutor/applicants",label:"Applicants",symbol:"♧"}],
 admin:[{href:"/dashboard/admin",label:"Overview",symbol:"▦"},{href:"/dashboard/admin/users",label:"Manage Users",symbol:"♧"},{href:"/dashboard/admin/tuitions",label:"Moderate Tuitions",symbol:"⌗"},{href:"/dashboard/admin/transactions",label:"Transactions",symbol:"＄"}]
};
export default function DashboardShell({children}:{children:ReactNode}){
 const {user}=useAuth(),path=usePathname();const [open,setOpen]=useState(true);
 return <SessionGate><div className={`dashboard-layout ${open?"":"collapsed"}`}>
  <aside className={`dashboard-sidebar ${open?"":"collapsed"}`}><div className="side-heading">YOUR WORKSPACE <button onClick={()=>setOpen(!open)} title="Collapse sidebar" className="icon-button">☰</button></div>
   {user&&<><div className="side-user"><span className="side-avatar">{user.image?<img src={user.image} alt=""/>:user.name[0]?.toUpperCase()}</span><div><b>{user.name}</b><small>{user.role.toUpperCase()} · {user.plan.toUpperCase()}</small></div></div>
   <nav aria-label="Dashboard navigation">{menus[user.role].map(item=><Link key={item.href} href={item.href} className={path===item.href?"side-link active":"side-link"}><span>{item.symbol}</span><span className="side-label">{item.label}</span></Link>)}<Link href="/dashboard/profile" className={path==="/dashboard/profile"?"side-link active":"side-link"}><span>⚙</span><span className="side-label">My Profile</span></Link></nav></>}
   <div className="side-footer"><Link href="/tuitions">↖ Browse tuitions</Link></div>
  </aside>
  <div className="dashboard-main"><div className="dashboard-topbar"><button className="icon-button" onClick={()=>setOpen(!open)} aria-label="Toggle sidebar">☰</button><span>Dashboard / {path.split("/").pop()?.replaceAll("-"," ")}</span><span className="topbar-plan">{user?.plan.toUpperCase()} PLAN</span></div><div className="dashboard-content">{children}</div></div>
 </div></SessionGate>;
}

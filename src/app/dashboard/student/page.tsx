"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {api,money,dateString} from "@/lib/api";
import {SessionGate,useAuth} from "@/components/Providers";
import {StatCard,Badge,Busy,Empty} from "@/components/Toolkit";
import type {Application} from "@/lib/types";
export default function StudentOverview(){const {user}=useAuth();const [stats,setStats]=useState<{totalApplied:number;accepted:number;pending:number;plan:string}|null>(null),[apps,setApps]=useState<Application[]>([]);
 useEffect(()=>{void Promise.all([api<typeof stats>("/api/student/stats",{auth:true}),api<{items:Application[]}>("/api/student/applications",{auth:true})]).then(([a,b])=>{setStats(a);setApps(b.items.slice(0,5));}).catch(()=>{});},[]);
 return <SessionGate role="student"><div className="row space-between wrap"><div><span className="eyebrow">STUDENT WORKSPACE</span><h1 className="dashboard-title">Welcome back, {user?.name.split(" ")[0]}!</h1><p className="dashboard-subtitle">Here&apos;s how your learning journey is going.</p></div><Link className="button button-primary" href="/tuitions">Find a tuition ↗</Link></div>{!stats?<Busy/>:<div className="stats-grid"><StatCard label="Total applied" value={stats.totalApplied} symbol="✉"/><StatCard label="Accepted" value={stats.accepted} symbol="✓"/><StatCard label="Pending" value={stats.pending} symbol="◷"/><StatCard label="Current plan" value={stats.plan.toUpperCase()} symbol="✦"/></div>}
 <div className="panel"><div className="row space-between wrap"><h3>Recent applications</h3><Link href="/dashboard/student/my-applications" className="button-link">View all →</Link></div>{apps.length?<div className="data-table-wrap"><table className="data-table"><thead><tr><th>Tuition</th><th>Tutor</th><th>Fee</th><th>Applied</th><th>Status</th></tr></thead><tbody>{apps.map(a=><tr key={a.id}><td><strong>{a.tuitionTitle}</strong></td><td>{a.tutorName}</td><td>{money(a.monthlyFee)}</td><td>{dateString(a.appliedAt)}</td><td><Badge status={a.status}/></td></tr>)}</tbody></table></div>:<Empty title="No applications yet" message="Find your first mentorship and start learning." href="/tuitions"/>}</div></SessionGate>;
}

"use client";
import {useEffect,useState} from "react";
import {api,dateString} from "@/lib/api";
import {SessionGate,useToast} from "@/components/Providers";
import {Badge,Busy,Empty} from "@/components/Toolkit";
import type {User,Role} from "@/lib/types";
export default function AdminUsers(){const [items,setItems]=useState<User[]>([]),[busy,setBusy]=useState(true),toast=useToast();const load=async()=>{try{setItems((await api<{items:User[]}>("/api/admin/users",{auth:true})).items);}catch(e){toast(e instanceof Error?e.message:"Could not load users","error");}finally{setBusy(false);}};useEffect(()=>{void Promise.resolve().then(()=>load());},[]);
 const change=async(u:User,role:Role)=>{if(!confirm(`Change ${u.name}'s role to ${role}?`))return;try{await api(`/api/admin/users/${u.id}/role`,{method:"PATCH",auth:true,body:{role}});toast("Role updated");void load();}catch(e){toast(e instanceof Error?e.message:"Role update failed","error");}};
 return <SessionGate role="admin"><span className="eyebrow">COMMUNITY MANAGEMENT</span><h1 className="dashboard-title">Manage Users</h1><p className="dashboard-subtitle">Assign Student, Tutor or Admin permissions through the protected API.</p>{busy?<Busy/>:items.length?<div className="data-table-wrap"><table className="data-table"><thead><tr><th>User</th><th>Role</th><th>Plan</th><th>Joined</th><th>Change role</th></tr></thead><tbody>{items.map(u=><tr key={u.id}><td><strong>{u.name}</strong><small>{u.email}</small></td><td><Badge status={u.role}/></td><td><Badge status={u.plan}/></td><td>{dateString(u.createdAt)}</td><td><select className="form-select" aria-label={`Change role for ${u.name}`} value={u.role} onChange={e=>void change(u,e.target.value as Role)}>{["student","tutor","admin"].map(role=><option key={role}>{role}</option>)}</select></td></tr>)}</tbody></table></div>:<Empty title="No users found"/>}</SessionGate>;
}

"use client";
import {useEffect,useState} from "react";
import {api,dateString} from "@/lib/api";
import {SessionGate,useToast} from "@/components/Providers";
import {Badge,Busy,Empty} from "@/components/Toolkit";
import type {Payment} from "@/lib/types";
export default function AdminTransactions(){const [items,setItems]=useState<Payment[]>([]),[busy,setBusy]=useState(true),toast=useToast();useEffect(()=>{void api<{items:Payment[]}>("/api/admin/transactions",{auth:true}).then(x=>setItems(x.items)).catch(e=>toast(e.message,"error")).finally(()=>setBusy(false));},[]);
 return <SessionGate role="admin"><span className="eyebrow">PAYMENTS & BILLING</span><h1 className="dashboard-title">Stripe Transactions</h1><p className="dashboard-subtitle">Verified Stripe Checkout payments, never unverified redirect events.</p>{busy?<Busy/>:items.length?<div className="data-table-wrap"><table className="data-table"><thead><tr><th>Customer</th><th>Role / Plan</th><th>Amount</th><th>Transaction ID</th><th>Paid At</th><th>Status</th></tr></thead><tbody>{items.map(p=><tr key={p.id}><td><strong>{p.userName}</strong><small>{p.userEmail}</small></td><td>{p.userRole} · {p.planName}</td><td><strong>${Number(p.amount).toFixed(2)} {p.currency?.toUpperCase()}</strong></td><td><small style={{wordBreak:"break-all"}}>{p.transactionId}</small></td><td>{dateString(p.paidAt)}</td><td><Badge status={p.paymentStatus}/></td></tr>)}</tbody></table></div>:<Empty title="No successful payments yet" message="Verified Stripe payments will appear here automatically."/>}</SessionGate>;
}

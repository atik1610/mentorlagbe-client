"use client";
import {useEffect,useState} from "react";
import {api} from "@/lib/api";
import {TuitionCard,Busy,Empty} from "@/components/Toolkit";
import {SessionGate,useToast} from "@/components/Providers";
import type {Tuition} from "@/lib/types";
export default function Saved(){const [items,setItems]=useState<Tuition[]>([]),[busy,setBusy]=useState(true);const toast=useToast();useEffect(()=>{void api<{items:Tuition[]}>("/api/student/saved",{auth:true}).then(x=>setItems(x.items)).catch(e=>toast(e.message,"error")).finally(()=>setBusy(false));},[]);return <SessionGate role="student"><span className="eyebrow">YOUR FAVORITES</span><h1 className="dashboard-title">Saved Tuitions</h1><p className="dashboard-subtitle">Pick up the sessions that caught your eye.</p>{busy?<Busy/>:items.length?<div className="tuition-grid">{items.map(t=><TuitionCard key={t.id} tuition={t}/>)}</div>:<Empty title="No saved tuition sessions yet" href="/tuitions" message="Tap Save on a session you want to revisit."/>}</SessionGate>}

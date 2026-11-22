"use client";
import Link from "next/link";
import {useState,ChangeEvent} from "react";
import {api,dateString,money} from "@/lib/api";
import {useToast} from "./Providers";
import type {Tuition} from "@/lib/types";
export function Badge({status}:{status:string}){return <span className={`badge badge-${status.toLowerCase().replace(/[^a-z]/g,"")}`}>{status}</span>;}
export function StatCard({label,value,symbol}:{label:string;value:number|string;symbol?:string}){return <div className="stat-card"><span className="stat-icon">{symbol||"✦"}</span><div className="stat-value">{value}</div><span className="stat-label">{label}</span></div>;}
export function TuitionCard({tuition}:{tuition:Tuition}){return <article className="tuition-card">
  <div className={`tuition-art art-${tuition.subject.toLowerCase().replace(/[^a-z]/g,"")}`}>
    {tuition.bannerImage?<img src={tuition.bannerImage} alt={`${tuition.title} banner`} loading="lazy"/>:<div className="art-shapes"><span>✦</span><strong>{tuition.subject}</strong><small>LEARN · GROW · ACHIEVE</small></div>}
    <span className="art-mode">{tuition.mode}</span>
  </div>
  <div className="tuition-info"><div className="card-tags"><span>{tuition.subject}</span><span>{tuition.classLevel}</span></div><h3>{tuition.title}</h3><p className="card-meta">{tuition.offeringType||"Batch"} · {tuition.daysPerWeek} days/week · {tuition.location}</p>
  <div className="card-footer"><div><span className="muted-label">Monthly</span><strong>{money(tuition.monthlyFee)}</strong></div><Link href={`/tuitions/${tuition.id}`} className="button button-primary small">View Details ↗</Link></div>
  <div className="tutor-byline">✧ By {tuition.tutorName}</div></div>
 </article>;
}
export function Empty({title="Nothing here yet",message="Check back soon for more updates.",href,label}:{title?:string;message?:string;href?:string;label?:string}){return <div className="empty-state"><span className="empty-icon">◇</span><h3>{title}</h3><p>{message}</p>{href&&<Link className="button button-outline" href={href}>{label||"Explore Tuitions"}</Link>}</div>;}
export function Busy({label="Loading…"}:{label?:string}){return <div className="loading"><div className="spinner"/>{label}</div>;}
export function SectionHeading({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle?:string}){return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>;}
export function ImageUploader({onUploaded,label="Upload an image"}:{onUploaded:(url:string)=>void;label?:string}){
 const [busy,setBusy]=useState(false);const toast=useToast();
 const change=async(e:ChangeEvent<HTMLInputElement>)=>{
  const file=e.target.files?.[0];if(!file)return;
  if(file.size>4*1024*1024){toast("Choose an image under 4 MB","error");return;}
  if(!["image/jpeg","image/png","image/webp"].includes(file.type)){toast("JPG, PNG or WebP only","error");return;}
  setBusy(true);
  try{
   const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error("Cannot read image"));reader.readAsDataURL(file);});
   const result=await api<{url:string}>("/api/media/upload",{method:"POST",auth:true,body:{data}});onUploaded(result.url);toast("Image uploaded successfully");
  }catch(err){toast(err instanceof Error?err.message:"Upload failed","error");}finally{setBusy(false);e.target.value="";}
 };
 return <label className="upload-box"><span>☁</span><span>{busy?"Uploading…":label}<small>JPG, PNG or WebP · max 4 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={change}/></label>;
}
export function ApplicationSummary({date,status}:{date:string;status:string}){return <div className="row gap"><Badge status={status}/><span className="subtle-text">Applied {dateString(date)}</span></div>;}

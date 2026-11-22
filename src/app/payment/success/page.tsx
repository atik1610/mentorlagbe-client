"use client";
import {useEffect,useState,Suspense} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {api} from "@/lib/api";
import {useAuth} from "@/components/Providers";
import {Busy} from "@/components/Toolkit";
function VerifySuccess(){const params=useSearchParams(),{user,loading,refresh}=useAuth();const [message,setMessage]=useState("Verifying your payment with Stripe…"),[success,setSuccess]=useState(false);
 useEffect(()=>{if(loading||!user)return;const session=params.get("session_id");if(!session){void Promise.resolve().then(()=>setMessage("No checkout session found. Your account was not upgraded."));return;}void api<{paid:boolean}>(`/api/payments/status?session_id=${encodeURIComponent(session)}`,{auth:true}).then(async r=>{if(r.paid){setSuccess(true);setMessage("Your Stripe payment is verified. Your Pro plan is active!");await refresh();}else setMessage("Payment is still processing. Your plan will activate after Stripe confirms payment.");}).catch(e=>setMessage(e.message));},[user?.id,loading,params,refresh]);
 return <div className="auth-section"><div className="auth-card" style={{textAlign:"center"}}><span style={{fontSize:"3.5rem",color:success?"var(--teal)":"var(--accent)"}}>{success?"✓":"◷"}</span><h1 style={{fontSize:"2rem"}}>{success?"You&apos;re Pro!":"Payment status"}</h1><p>{message}</p>{!user&&!loading?<Link href="/sign-in" className="button button-primary">Sign in to verify</Link>:<Link href="/dashboard" className="button button-primary">Return to Dashboard</Link>}</div></div>;
}
export default function Success(){return <Suspense fallback={<Busy/>}><VerifySuccess/></Suspense>}

"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/components/Providers";
import {dashboardRoute} from "@/lib/api";
export default function Dashboard(){const {user,loading}=useAuth();const router=useRouter();useEffect(()=>{if(!loading&&user)router.replace(dashboardRoute(user.role));},[user,loading,router]);return <div className="empty-state">Preparing your workspace…</div>;}

import {Suspense} from "react";
import {TuitionForm} from "@/components/TuitionForm";
import {SessionGate} from "@/components/Providers";
import {Busy} from "@/components/Toolkit";
export default function PostTuition(){return <SessionGate role="tutor"><span className="eyebrow">GROW YOUR IMPACT</span><h1 className="dashboard-title">Create or edit a tuition</h1><p className="dashboard-subtitle">Share your expertise. Every new or edited listing awaits Admin review.</p><Suspense fallback={<Busy/>}><TuitionForm/></Suspense></SessionGate>}

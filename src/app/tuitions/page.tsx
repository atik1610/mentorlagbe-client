"use client";
import {useEffect,useState,useCallback,Suspense} from "react";
import {useSearchParams} from "next/navigation";
import {api} from "@/lib/api";
import type {PageList,Tuition} from "@/lib/types";
import {TuitionCard,Empty,Busy} from "@/components/Toolkit";
function Browse(){const qs=useSearchParams();const [search,setSearch]=useState(qs.get("search")||""),[subject,setSubject]=useState(""),[classLevel,setClass]=useState(""),[mode,setMode]=useState(""),[page,setPage]=useState(1),[loading,setLoading]=useState(true),[error,setError]=useState(""),[result,setResult]=useState<PageList<Tuition>>({items:[],page:1,pages:1,total:0,limit:9});
 const [query,setQuery]=useState(qs.get("search")||"");
 const load=useCallback(async()=>{setLoading(true);setError("");try{const p=new URLSearchParams({page:String(page),limit:"9"});if(query)p.set("search",query);if(subject)p.set("subject",subject);if(classLevel)p.set("classLevel",classLevel);if(mode)p.set("mode",mode);setResult(await api<PageList<Tuition>>(`/api/tuitions?${p}`));}catch(err){setError(err instanceof Error?err.message:"Could not load sessions");}finally{setLoading(false);}},[query,subject,classLevel,mode,page]);
 useEffect(()=>{void Promise.resolve().then(()=>load());},[load]);
 return <><section className="page-top"><div className="container"><span className="eyebrow">FIND YOUR PERFECT MATCH</span><h1>Explore tuition sessions.</h1><p>Filter expert-led batches and personal mentorship sessions by what matters to you.</p></div></section><div className="container page-content">
 <form className="filters" onSubmit={e=>{e.preventDefault();setPage(1);setQuery(search);}}>
 <input className="form-input" placeholder="Search by title or subject..." aria-label="Search tuitions" value={search} onChange={e=>setSearch(e.target.value)}/>
 <select className="form-select" aria-label="Subject" value={subject} onChange={e=>{setSubject(e.target.value);setPage(1);}}><option value="">All Subjects</option>{["Math","Physics","Programming","English","IELTS","Chemistry","Biology","Bangla","Economics"].map(s=><option key={s}>{s}</option>)}</select>
 <select className="form-select" aria-label="Class level" value={classLevel} onChange={e=>{setClass(e.target.value);setPage(1);}}><option value="">All Levels</option>{["Class 6-8","Class 9-10","HSC","University","All Levels"].map(s=><option key={s}>{s}</option>)}</select>
 <select className="form-select" aria-label="Mode" value={mode} onChange={e=>{setMode(e.target.value);setPage(1);}}><option value="">Online & Offline</option><option>Online</option><option>Offline</option></select><button className="button button-primary" type="submit">Search ↗</button>
 </form>
 <div className="row space-between wrap" style={{marginBottom:24}}><h3 style={{margin:0}}>{result.total} sessions found</h3><span className="subtle-text">Admin-approved and currently active</span></div>
 {error?<div className="notice error">{error}</div>:loading?<Busy label="Finding tuition sessions…"/>:result.items.length?<div className="tuition-grid">{result.items.map(t=><TuitionCard tuition={t} key={t.id}/>)}</div>:<Empty title="No sessions match your search" message="Try another subject, class level or learning mode."/>}
 {!loading&&result.pages>1&&<nav className="pagination" aria-label="Pagination"><button onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1}>← Previous</button>{Array.from({length:Math.min(result.pages,7)},(_,i)=>i+Math.max(1,Math.min(page-3,result.pages-6))).map(n=><button key={n} className={page===n?"active":""} onClick={()=>setPage(n)}>{n}</button>)}<button disabled={page>=result.pages} onClick={()=>setPage(page+1)}>Next →</button></nav>}
 </div></>;
}
export default function BrowsePage(){return <Suspense fallback={<Busy/>}><Browse/></Suspense>}

"use client";
import Link from "next/link";
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <div className="container page-content"><div className="empty-state"><span className="empty-icon">!</span><h1 style={{fontSize:"2.5rem"}}>Something went wrong</h1><p>We couldn&apos;t load this page. Please try again.</p><div className="action-row" style={{justifyContent:"center"}}><button className="button button-primary" onClick={reset}>Try again</button><Link href="/" className="button button-outline">Back to Home</Link></div></div></div>}

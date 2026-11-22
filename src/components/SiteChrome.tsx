"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {ThemeToggle,useAuth} from "./Providers";
import {dashboardRoute} from "@/lib/api";

const links=[{href:"/",label:"Home"},{href:"/tuitions",label:"Browse Tuitions"},{href:"/pricing",label:"Pricing"},{href:"/about",label:"How It Works"}];
export function SiteHeader(){const {user,loading,signOut}=useAuth();const pathname=usePathname();const [mobile,setMobile]=useState(false);
 return <header className="site-header"><div className="container nav">
  <Link href="/" className="brand" onClick={()=>setMobile(false)}><span className="brand-mark">✦</span> Mentor<span>Lagbe</span></Link>
  <button className="mobile-menu" onClick={()=>setMobile(v=>!v)} aria-label="Toggle navigation">☰</button>
  <div className={`nav-center ${mobile?"mobile-show":""}`}>{links.map(link=><Link href={link.href} onClick={()=>setMobile(false)} className={pathname===link.href?"active":""} key={link.href}>{link.label}</Link>)}</div>
  <div className="nav-actions"><ThemeToggle/>{!loading && user?<>
   <Link className="nav-avatar" href="/dashboard/profile" title="Edit profile">{user.image?<img src={user.image} alt=""/>:user.name.slice(0,1).toUpperCase()}</Link>
   <div className="nav-user"><b>{user.name.split(" ")[0]}</b><small><span className="role-badge">{user.role}</span> · {user.plan}</small></div>
   <Link className="button button-outline small nav-dash" href={dashboardRoute(user.role)}>Dashboard</Link>
   <button className="text-button" onClick={()=>void signOut()}>Sign Out</button>
  </>:<><Link href="/sign-in" className="button button-ghost small">Sign In</Link><Link href="/sign-up" className="button button-primary small">Get Started</Link></>}</div>
 </div></header>;
}
export function SiteFooter(){return <footer className="site-footer"><div className="container footer-grid">
 <div><Link href="/" className="brand"><span className="brand-mark">✦</span> Mentor<span>Lagbe</span></Link><p>Real connections. Better learning. Discover a tutor, find your rhythm, and grow together.</p></div>
 <div><b>Explore</b><Link href="/">Home</Link><Link href="/tuitions">Browse Tutors</Link><Link href="/pricing">Pricing</Link><Link href="/about">How It Works</Link></div>
 <div><b>Contact</b><span>hello@mentorlagbe.example</span><span>Phone: available on request</span><span>Dhaka, Bangladesh</span><span className="footer-social"><a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X social network">𝕏</a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a></span></div>
 </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} MentorLagbe. All rights reserved.</span><span>Designed for curious minds.</span></div></footer>;
}

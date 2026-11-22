import type {Metadata} from "next";
import "./globals.css";
import {Providers} from "@/components/Providers";
import {SiteHeader,SiteFooter} from "@/components/SiteChrome";
export const metadata:Metadata={title:"MentorLagbe | Find Your Next Learning Breakthrough",description:"Discover expert tutors, learn your way and build a brighter future with MentorLagbe."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><Providers><SiteHeader/><main className="main-content">{children}</main><SiteFooter/></Providers></body></html>;}

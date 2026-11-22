import Link from "next/link";
export default function NotFound(){return <section className="container page-content"><div className="empty-state"><span className="empty-icon">404</span><h1 style={{fontSize:"2.5rem"}}>We couldn&apos;t find that page</h1><p>That route may have moved or never existed.</p><Link href="/" className="button button-primary">Back to Home →</Link></div></section>}

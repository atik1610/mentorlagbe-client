import Link from "next/link";

type Props = { title: string; description: string; route: string };

export default function Placeholder({ title, description, route }: Props) {
  return (
    <section className="placeholder container">
      <div className="eyebrow">NEXT DEVELOPMENT MISSION · {route}</div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="coming">Page route is ready. Functionality is not implemented yet.</div>
      <Link className="button button-outline" href="/">Back to Home</Link>
    </section>
  );
}

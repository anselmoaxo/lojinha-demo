import Link from "next/link";
import { store } from "@/content";

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white/80">
      <div className="container-shell grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">{store.name}</p>
          <p className="mt-2 text-sm">{store.tagline}</p>
        </div>
        <div className="text-sm">
          <p>{store.contact.address}</p>
          <p className="mt-1">{store.contact.hours}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm md:items-end">
          <a href={store.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">{store.contact.instagramHandle}</a>
          <a href={`mailto:${store.contact.email}`} className="hover:text-white">{store.contact.email}</a>
          <Link href="/politica-de-privacidade/" className="hover:text-white">Política de privacidade</Link>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/50">{store.demoNotice}</p>
    </footer>
  );
}

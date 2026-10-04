import Link from "next/link";
import { store } from "@/content";

export function Footer() {
  return (
    <footer className="mt-24 bg-cacau text-seda">
      <div className="shell grid gap-8 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-paper">{store.name}</p>
          <p className="mt-2">{store.tagline}</p>
        </div>
        <div>
          <p>{store.contact.address}</p>
          <p className="mt-1">{store.contact.hours}</p>
        </div>
        <ul className="space-y-1">
          <li><a href={store.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">{store.contact.instagramHandle}</a></li>
          <li><a href={`mailto:${store.contact.email}`} className="hover:text-paper">{store.contact.email}</a></li>
          <li><Link href="/politica-de-privacidade/" className="hover:text-paper">Política de privacidade</Link></li>
        </ul>
      </div>
      <p className="shell pb-5 text-sm text-seda">Fotografias de referência: Phạm Thành Đạt, Caio Niceas e Gustavo Peres / <a className="underline" href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels</a>. As apresentações podem variar.</p>
      {store.demoNotice ? <p className="border-t border-white/10 px-4 py-4 text-center text-sm text-seda">{store.demoNotice}</p> : null}
    </footer>
  );
}

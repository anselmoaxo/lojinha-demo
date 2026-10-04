import { store } from "@/content";

/** Links to the store's pages on delivery apps. Entries without a link are hidden. */
export function MarketplaceLinks({ className = "" }: { className?: string }) {
  const apps = (store.marketplaces ?? []).filter((app) => app.name && app.url);
  if (apps.length === 0) return null;

  return (
    <div className={className}>
      <p className="font-bold">Prefere pedir por aplicativo?</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {apps.map((app) => (
          <li key={app.name}>
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small" data-umami-event="Clique no app de entrega" data-umami-event-app={app.name}>
              Pedir no {app.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

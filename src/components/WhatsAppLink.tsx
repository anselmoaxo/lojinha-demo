import { store } from "@/content";
import { whatsappUrl } from "@/lib/order";

export function WhatsAppLink({ className = "btn btn-outline", label = "Tirar dúvidas no WhatsApp" }: { className?: string; label?: string }) {
  return (
    <a href={whatsappUrl(store.contact.whatsapp, `Olá, ${store.name}! Tenho uma dúvida.`)} target="_blank" rel="noopener noreferrer" className={className} data-umami-event="Clique no WhatsApp">
      {label}
    </a>
  );
}

"use client";

import { Minus, Plus, Send, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { store } from "@/content";
import { trackEvent } from "@/config/analytics";
import { asset } from "@/lib/asset";
import { buildOrderMessage, formatBRL, orderProblems, orderTotals, toCents, whatsappUrl, type Customer, type OrderProblem } from "@/lib/order";
import { useCart } from "./CartProvider";

const PROBLEM_TEXT: Record<OrderProblem, string> = {
  empty: "Seu carrinho está vazio.",
  name: "Informe seu nome.",
  address: "Informe o endereço de entrega.",
  minimum: `O pedido mínimo é ${formatBRL(toCents(store.orders.minimumOrder))}.`,
};

export function CartDrawer() {
  const { lines, open, setOpen, setQuantity, remove, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    fulfillment: store.orders.delivery ? "delivery" : "pickup",
    address: "",
    payment: store.orders.payments[0] ?? "",
    notes: "",
  });
  const [problems, setProblems] = useState<OrderProblem[]>([]);
  const totals = orderTotals(lines, customer.fulfillment, store.orders.deliveryFee);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]') ?? []).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [open, setOpen]);

  if (!open) return null;

  const update = (patch: Partial<Customer>) => {
    setCustomer((current) => ({ ...current, ...patch }));
    setProblems([]);
  };

  function send(event: React.FormEvent) {
    event.preventDefault();
    const found = orderProblems(lines, customer, store.orders.minimumOrder);
    setProblems(found);
    if (found.length > 0) return;
    const message = buildOrderMessage(store.name, lines, customer, store.orders.deliveryFee);
    trackEvent("Enviou pedido", { total: totals.total / 100 });
    window.open(whatsappUrl(store.contact.whatsapp, message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="carrinho-titulo">
      <button type="button" aria-label="Fechar carrinho" className="absolute inset-0 bg-cacau/50" onClick={() => setOpen(false)} tabIndex={-1} />
      <div ref={dialogRef} className="relative flex h-full w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-seda px-5 py-4">
          <h2 id="carrinho-titulo" className="font-display text-2xl">Seu pedido</h2>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-seda" aria-label="Fechar carrinho">
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <form onSubmit={send} className="flex-1 overflow-y-auto px-5 py-4" noValidate>
          {lines.length === 0 ? (
            <div className="rounded-2xl bg-seda/50 px-5 py-10 text-center">
              <p className="font-display text-2xl">Um pedido cheio de encanto</p>
              <p className="mt-3 text-cacau-soft">Seu carrinho está vazio. Escolha seus favoritos no cardápio.</p>
              <button type="button" className="btn btn-cacau mt-6" onClick={() => setOpen(false)}>Continuar escolhendo</button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3 rounded-2xl bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(line.product.image)} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold leading-tight">{line.name}</p>
                    {line.option ? <p className="text-xs text-cacau-soft">{line.option}</p> : null}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button type="button" className="qty-button" aria-label={`Diminuir ${line.name}`} onClick={() => (line.quantity > 1 ? setQuantity(line.key, line.quantity - 1) : remove(line.key))}>
                          {line.quantity > 1 ? <Minus aria-hidden className="size-4" /> : <Trash2 aria-hidden className="size-4" />}
                        </button>
                        <span className="w-8 text-center font-bold" aria-label="Quantidade">{line.quantity}</span>
                        <button type="button" className="qty-button" aria-label={`Aumentar ${line.name}`} onClick={() => setQuantity(line.key, line.quantity + 1)}>
                          <Plus aria-hidden className="size-4" />
                        </button>
                      </div>
                      <p className="font-bold">{formatBRL(toCents(line.unitPrice) * line.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 ? (
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="pedido-nome" className="field-label">Seu nome</label>
                <input id="pedido-nome" className="field" autoComplete="name" value={customer.name} onChange={(event) => update({ name: event.target.value })} maxLength={120} required />
              </div>

              {store.orders.delivery && store.orders.pickup ? (
                <fieldset>
                  <legend className="field-label">Como quer receber?</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(["delivery", "pickup"] as const).map((value) => (
                      <label key={value} className={`choice ${customer.fulfillment === value ? "choice-active" : ""}`}>
                        <input type="radio" name="fulfillment" value={value} checked={customer.fulfillment === value} onChange={() => update({ fulfillment: value })} className="sr-only" />
                        {value === "delivery" ? `Entrega (${formatBRL(toCents(store.orders.deliveryFee))})` : "Retirar no local"}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {customer.fulfillment === "delivery" ? (
                <div>
                  <label htmlFor="pedido-endereco" className="field-label">Endereço de entrega</label>
                  <textarea id="pedido-endereco" className="field" rows={2} autoComplete="street-address" value={customer.address} onChange={(event) => update({ address: event.target.value })} maxLength={300} required />
                  <p className="mt-1 text-xs text-cacau-soft">{store.orders.deliveryArea}</p>
                </div>
              ) : (
                <p className="rounded-2xl bg-seda p-3 text-sm">Retirada em {store.contact.address}. {store.contact.hours}.</p>
              )}

              <div>
                <label htmlFor="pedido-pagamento" className="field-label">Pagamento</label>
                <select id="pedido-pagamento" className="field" value={customer.payment} onChange={(event) => update({ payment: event.target.value })}>
                  {store.orders.payments.map((payment) => (
                    <option key={payment}>{payment}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pedido-obs" className="field-label">Observações (opcional)</label>
                <textarea id="pedido-obs" className="field" rows={2} value={customer.notes} onChange={(event) => update({ notes: event.target.value })} maxLength={500} placeholder="Data desejada, mensagem do cartão, etc." />
              </div>
            </div>
          ) : null}

          {lines.length > 0 ? (
            <div className="sticky bottom-0 -mx-5 mt-6 border-t border-seda bg-paper px-5 pb-2 pt-4">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatBRL(totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt>{customer.fulfillment === "delivery" ? "Entrega" : "Retirada"}</dt><dd>{totals.delivery ? formatBRL(totals.delivery) : "Grátis"}</dd></div>
                <div className="flex justify-between text-lg font-extrabold"><dt>Total</dt><dd>{formatBRL(totals.total)}</dd></div>
              </dl>
              {problems.length > 0 ? (
                <ul className="mt-3 rounded-2xl bg-red-50 p-3 text-sm text-red-800" role="alert">
                  {problems.map((problem) => <li key={problem}>{PROBLEM_TEXT[problem]}</li>)}
                </ul>
              ) : null}
              <button type="submit" className="btn btn-whatsapp mt-4 w-full">
                <Send aria-hidden className="size-4" />
                Enviar pedido pelo WhatsApp
              </button>
              <div className="mt-2 flex items-center justify-between text-xs text-cacau-soft">
                <span>{store.orders.notice}</span>
                <button type="button" className="underline hover:text-cacau" onClick={clear}>Esvaziar</button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

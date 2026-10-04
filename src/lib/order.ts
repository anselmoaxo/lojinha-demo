// Pure order logic shared by the cart and the tests. No React, no browser APIs.

export type CartLine = { name: string; option?: string; unitPrice: number; quantity: number };

export type Fulfillment = "delivery" | "pickup";

export type Customer = {
  name: string;
  fulfillment: Fulfillment;
  address?: string;
  payment: string;
  notes?: string;
};

export const MAX_QUANTITY = 99;

/** Prices are edited in reais (e.g. 89.9); math is done in whole cents to avoid float errors. */
export function toCents(value: number): number {
  return Math.round(Number(value) * 100) || 0;
}

export function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100).replace(/\s/g, " ");
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));
}

export function subtotalCents(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + toCents(line.unitPrice) * clampQuantity(line.quantity), 0);
}

export function orderTotals(lines: CartLine[], fulfillment: Fulfillment, deliveryFee: number) {
  const subtotal = subtotalCents(lines);
  const delivery = fulfillment === "delivery" ? toCents(deliveryFee) : 0;
  return { subtotal, delivery, total: subtotal + delivery };
}

export type OrderProblem = "empty" | "name" | "address" | "minimum";

export function orderProblems(lines: CartLine[], customer: Customer, minimumOrder: number): OrderProblem[] {
  const problems: OrderProblem[] = [];
  if (lines.length === 0) problems.push("empty");
  if (!customer.name.trim()) problems.push("name");
  if (customer.fulfillment === "delivery" && !customer.address?.trim()) problems.push("address");
  if (lines.length > 0 && subtotalCents(lines) < toCents(minimumOrder)) problems.push("minimum");
  return problems;
}

function clean(text: string | undefined, max = 300): string {
  return (text ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function buildOrderMessage(storeName: string, lines: CartLine[], customer: Customer, deliveryFee: number): string {
  const totals = orderTotals(lines, customer.fulfillment, deliveryFee);
  const items = lines.map((line) => {
    const quantity = clampQuantity(line.quantity);
    const option = line.option ? ` (${clean(line.option, 80)})` : "";
    return `• ${quantity}x ${clean(line.name, 120)}${option}: ${formatBRL(toCents(line.unitPrice) * quantity)}`;
  });
  const message = [
    `Olá, ${clean(storeName, 80)}! Quero fazer um pedido:`,
    "",
    ...items,
    "",
    `Subtotal: ${formatBRL(totals.subtotal)}`,
    customer.fulfillment === "delivery" ? `Entrega: ${formatBRL(totals.delivery)}` : "Retirada no local",
    `*Total: ${formatBRL(totals.total)}*`,
    "",
    `Nome: ${clean(customer.name, 120)}`,
    customer.fulfillment === "delivery" ? `Endereço: ${clean(customer.address)}` : "",
    `Pagamento: ${clean(customer.payment, 80)}`,
    customer.notes?.trim() ? `Observações: ${clean(customer.notes, 500)}` : "",
  ];
  return message.filter((line, index, all) => line !== "" || (all[index - 1] ?? "") !== "").join("\n").trim();
}

export function whatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

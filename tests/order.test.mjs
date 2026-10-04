import assert from "node:assert/strict";
import test from "node:test";
import { buildOrderMessage, clampQuantity, formatBRL, orderProblems, orderTotals, toCents, whatsappUrl } from "../src/lib/order.ts";

const lines = [
  { name: "Caixa presente", unitPrice: 89.9, quantity: 3 },
  { name: "Bolo no pote", option: "Prestígio", unitPrice: 14, quantity: 2 },
];
const customer = { name: "Ana", fulfillment: "delivery", address: "Rua A, 10", payment: "Pix", notes: "" };

test("totals are computed in cents without float drift", () => {
  assert.equal(toCents(0.1 + 0.2), 30);
  assert.deepEqual(orderTotals(lines, "delivery", 10), { subtotal: 29770, delivery: 1000, total: 30770 });
  assert.deepEqual(orderTotals(lines, "pickup", 10), { subtotal: 29770, delivery: 0, total: 29770 });
});

test("quantities stay between 1 and 99", () => {
  assert.equal(clampQuantity(0), 1);
  assert.equal(clampQuantity(250), 99);
  assert.equal(clampQuantity(Number.NaN), 1);
  assert.equal(clampQuantity(2.7), 2);
});

test("order message lists items, totals and customer data", () => {
  const message = buildOrderMessage("Doce Encanto", lines, customer, 10);
  assert.match(message, /^Olá, Doce Encanto! Quero fazer um pedido:/);
  assert.match(message, /• 3x Caixa presente: R\$ 269,70/);
  assert.match(message, /• 2x Bolo no pote \(Prestígio\): R\$ 28,00/);
  assert.match(message, /Entrega: R\$ 10,00/);
  assert.match(message, /\*Total: R\$ 307,70\*/);
  assert.match(message, /Endereço: Rua A, 10/);
  assert.doesNotMatch(message, /Observações/);
  assert.doesNotMatch(message, /\n\n\n/);
});

test("pickup orders omit the address", () => {
  const message = buildOrderMessage("Loja", lines, { ...customer, fulfillment: "pickup", address: "Rua A" }, 10);
  assert.match(message, /Retirada no local/);
  assert.doesNotMatch(message, /Endereço/);
});

test("validation catches missing data and minimum order", () => {
  assert.deepEqual(orderProblems([], { ...customer, name: " " }, 30), ["empty", "name"]);
  assert.deepEqual(orderProblems(lines, { ...customer, address: "" }, 30), ["address"]);
  assert.deepEqual(orderProblems([{ name: "X", unitPrice: 5, quantity: 1 }], customer, 30), ["minimum"]);
  assert.deepEqual(orderProblems(lines, customer, 30), []);
});

test("whatsapp link keeps only digits and encodes the text", () => {
  assert.equal(whatsappUrl("+55 (11) 99999-9999", "Olá & tchau"), "https://wa.me/5511999999999?text=Ol%C3%A1%20%26%20tchau");
  assert.equal(formatBRL(123456), "R$ 1.234,56");
});

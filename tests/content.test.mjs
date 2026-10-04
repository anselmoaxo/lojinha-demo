import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

// What the panel saves must still make a working store.
const read = (file) => JSON.parse(readFileSync(new URL(`../src/content/${file}`, import.meta.url), "utf8"));
const store = read("store.json");
const { items } = read("products.json");

function imageOk(path) {
  if (path.startsWith("https://")) return true;
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("..") && existsSync(new URL(`../public${path}`, import.meta.url));
}

test("products are valid", () => {
  assert.ok(items.length > 0, "at least one product");
  const ids = new Set();
  for (const product of items) {
    assert.match(product.id, /^[a-z0-9-]+$/, `id ${product.id}`);
    assert.ok(!ids.has(product.id), `duplicate id ${product.id}`);
    ids.add(product.id);
    assert.ok(product.name?.trim(), `${product.id}: name`);
    assert.ok(typeof product.price === "number" && product.price >= 0, `${product.id}: price must be a number`);
    assert.ok(imageOk(product.image), `${product.id}: image ${product.image}`);
    assert.equal(typeof product.available, "boolean", `${product.id}: available`);
    assert.ok(!product.options || Array.isArray(product.options), `${product.id}: options`);
  }
});

test("store settings are valid", () => {
  assert.match(store.contact.whatsapp, /^\d{12,13}$/);
  assert.ok(store.orders.pickup || store.orders.delivery, "pickup or delivery must be on");
  assert.ok(store.orders.payments.length > 0, "at least one payment method");
  for (const key of ["deliveryFee", "minimumOrder"]) assert.ok(typeof store.orders[key] === "number" && store.orders[key] >= 0, key);
  for (const path of [store.hero.image, store.seo.image]) assert.ok(imageOk(path), path);
});

test("weekly highlight points to an existing product", () => {
  if (!store.promo?.active) return;
  assert.ok(items.some((product) => product.id === store.promo.productId), `promo.productId ${store.promo.productId}`);
  assert.ok(imageOk(store.promo.image), store.promo.image);
});

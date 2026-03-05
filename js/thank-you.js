const CART_STORAGE_KEY = "shineBoxQty";
const ORDER_STORAGE_KEY = "shineLastOrder";
const FALLBACK_UNIT_PRICE = 399.99;

function init() {
  import("./global.header__nav.js");
  import("./global.footer__nav.js");
}

function formatPrice(value) {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `$${formatted.replace(/,/g, " ").replace(".", ",")}USD`;
}

function getStoredOrder() {
  const rawOrder = localStorage.getItem(ORDER_STORAGE_KEY);
  if (!rawOrder) return null;

  try {
    return JSON.parse(rawOrder);
  } catch {
    return null;
  }
}

function buildFallbackOrder() {
  const qty = Math.max(
    1,
    Number.parseInt(localStorage.getItem(CART_STORAGE_KEY), 10) || 1
  );
  const total = qty * FALLBACK_UNIT_PRICE;

  return {
    orderId: "#0001",
    product: {
      name: "Shine Box",
      image: "img/product-sea.webp",
      unitPriceText: formatPrice(FALLBACK_UNIT_PRICE),
    },
    quantity: qty,
    totalText: formatPrice(total),
    customer: {
      comments: "-",
      name: "-",
      email: "-",
      phone: "-",
    },
  };
}

function applyText(id, value) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = value;
}

function hydrateOrderSummary() {
  const order = getStoredOrder() || buildFallbackOrder();

  applyText("thank-you-order-id", order.orderId || "#0001");
  applyText("thank-you-product-name", order.product?.name || "Shine Box");
  applyText("thank-you-item-quantity", `${Math.max(1, Number(order.quantity) || 1)}x`);
  applyText(
    "thank-you-item-price",
    order.product?.unitPriceText || formatPrice(FALLBACK_UNIT_PRICE)
  );
  applyText("thank-you-total", order.totalText || formatPrice(FALLBACK_UNIT_PRICE));

  applyText("thank-you-comments", order.customer?.comments || "-");
  applyText("thank-you-name", order.customer?.name || "-");
  applyText("thank-you-email", order.customer?.email || "-");
  applyText("thank-you-phone", order.customer?.phone || "-");

  const image = document.getElementById("thank-you-product-image");
  if (image && order.product?.image) {
    image.src = order.product.image;
  }
}

function runAfterAllPartialsLoaded(callback) {
  const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
  ).length;

  if (totalPartials === 0) {
    callback();
    return;
  }

  let loadedPartialsCount = 0;

  const handleAfterOnLoad = () => {
    loadedPartialsCount += 1;
    if (loadedPartialsCount !== totalPartials) return;

    document.body.removeEventListener("htmx:afterOnLoad", handleAfterOnLoad);
    callback();
  };

  document.body.addEventListener("htmx:afterOnLoad", handleAfterOnLoad);
}

runAfterAllPartialsLoaded(() => {
  init();
  hydrateOrderSummary();
});

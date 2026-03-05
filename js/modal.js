const UNIT_PRICE = 399.99;
const STORAGE_KEY = "shineBoxQty";
const ORDER_STORAGE_KEY = "shineLastOrder";
const ORDER_COUNTER_KEY = "shineLastOrderCounter";
const MODAL_ENDPOINT = "/components/modal.html";
const PRODUCT_NAME = "Shine Box";
const PRODUCT_IMAGE = "img/product-sea.webp";
const PROMO_DISCOUNTS = {
  BeginnerPromo: 0.02,
  SoftServe: 0.2,
  ShineBoxUltimate: 0.499,
};

function getModalContainer() {
  return document.getElementById("modal-container");
}

function getStoredQty(defaultValue = 0) {
  return Number.parseInt(localStorage.getItem(STORAGE_KEY), 10) || defaultValue;
}

function setStoredQty(value) {
  localStorage.setItem(STORAGE_KEY, String(value));
}

function getNextOrderId() {
  const previous = Number.parseInt(localStorage.getItem(ORDER_COUNTER_KEY), 10) || 0;
  const next = previous + 1;
  localStorage.setItem(ORDER_COUNTER_KEY, String(next));

  return `#${String(next).padStart(4, "0")}`;
}

function updateFloatingCart() {
  const qty = getStoredQty(0);
  const floatingBtn = document.getElementById("floating-cart-btn");
  const badge = document.getElementById("cart-badge");

  if (!floatingBtn || !badge) return;

  if (qty > 0) {
    floatingBtn.classList.remove("hidden");
    badge.textContent = String(qty);
    return;
  }

  floatingBtn.classList.add("hidden");
}

function closeModal() {
  const modalContainer = getModalContainer();
  if (!modalContainer) return;

  modalContainer.innerHTML = "";
  document.body.style.overflow = "";
}

function formatPrice(value) {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `$${formatted.replace(/,/g, " ").replace(".", ",")}USD`;
}

function getPromoData(rawCode) {
  const code = rawCode.trim();
  const discount = PROMO_DISCOUNTS[code];

  if (!code || typeof discount !== "number") return null;

  return { code, discount };
}

function formatDiscountPercent(discount) {
  const percentValue = discount * 100;

  if (Number.isInteger(percentValue)) {
    return `${percentValue}%`;
  }

  return `${percentValue.toFixed(1)}%`;
}

function initModalContent() {
  const modalContainer = getModalContainer();
  if (!modalContainer || !modalContainer.children.length) return;

  document.body.style.overflow = "hidden";

  const modalDialog = modalContainer.querySelector(".modal-content");
  if (modalDialog) {
    modalDialog.focus();
  }

  const qtyInput = modalContainer.querySelector(".cart__item-qty");
  const priceDisplay = modalContainer.querySelector(".cart__item-price");
  const totalDisplay = modalContainer.querySelector(".cart__total");
  const orderSummaryInput = modalContainer.querySelector("#modal-order-summary");
  const promoLink = modalContainer.querySelector(".cart__promo-link");
  const promoArea = modalContainer.querySelector(".cart__promo-area");
  const promoInput = modalContainer.querySelector(".cart__promo-input");
  const promoStatus = modalContainer.querySelector(".cart__promo-status");
  const orderForm = modalContainer.querySelector(".cart__form");
  if (!qtyInput) return;

  const calculatePricing = (currentQty) => {
    const baseTotal = currentQty * UNIT_PRICE;
    const promoData = getPromoData(promoInput?.value || "");
    const discount = promoData ? promoData.discount : 0;
    const total = baseTotal * (1 - discount);

    return {
      promoData,
      total,
      formattedUnitPrice: formatPrice(UNIT_PRICE),
      formattedTotal: formatPrice(total),
    };
  };

  const updateOrderMeta = (currentQty, formattedTotal, promoData) => {
    if (orderSummaryInput) {
      const promoCode = promoData ? promoData.code : "None";
      orderSummaryInput.value = `Items: ${currentQty} | Total: ${formattedTotal} | Promo: ${promoCode}`;
    }
  };

  const updatePrices = (currentQty) => {
    const { promoData, formattedUnitPrice, formattedTotal } = calculatePricing(currentQty);

    if (priceDisplay) priceDisplay.textContent = formattedUnitPrice;
    if (totalDisplay) totalDisplay.textContent = `Total: ${formattedTotal}`;
    updateOrderMeta(currentQty, formattedTotal, promoData);

    if (!promoStatus) return;

    if (promoData) {
      promoStatus.hidden = false;
      promoStatus.textContent = `Promo code activated: ${promoData.code} (-${formatDiscountPercent(promoData.discount)})`;
      return;
    }

    promoStatus.hidden = true;
    promoStatus.textContent = "";
  };

  const getCurrentOrderData = () => {
    const currentQty = Math.max(1, Number.parseInt(qtyInput.value, 10) || 1);
    const { promoData, formattedUnitPrice, formattedTotal } = calculatePricing(currentQty);

    return {
      quantity: currentQty,
      promoCode: promoData ? promoData.code : "None",
      unitPriceText: formattedUnitPrice,
      totalText: formattedTotal,
    };
  };

  const qty = Math.max(1, getStoredQty(1));
  qtyInput.value = qty;
  setStoredQty(qty);
  updatePrices(qty);
  updateFloatingCart();

  const syncQty = (event) => {
    const target = event.target;
    const nextQty = Math.max(1, Number.parseInt(target.value, 10) || 1);

    qtyInput.value = nextQty;
    setStoredQty(nextQty);
    updatePrices(nextQty);
    updateFloatingCart();
  };

  qtyInput.addEventListener("input", syncQty);
  qtyInput.addEventListener("change", syncQty);

  if (promoLink && promoArea) {
    promoLink.addEventListener("click", (event) => {
      event.preventDefault();

      const shouldShow = promoArea.hidden;
      promoArea.hidden = !shouldShow;
      promoLink.setAttribute("aria-expanded", String(shouldShow));

      if (shouldShow && promoInput) {
        promoInput.focus();
      }
    });
  }

  if (promoInput) {
    const syncPromo = () => {
      const currentQty = Math.max(1, Number.parseInt(qtyInput.value, 10) || 1);
      updatePrices(currentQty);
    };

    promoInput.addEventListener("input", syncPromo);
    promoInput.addEventListener("change", syncPromo);
  }

  if (orderForm) {
    orderForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitBtn = orderForm.querySelector(".cart__submit-btn");
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = true;
      }

      const orderData = getCurrentOrderData();
      const formData = new FormData(orderForm);

      const snapshot = {
        orderId: getNextOrderId(),
        quantity: orderData.quantity,
        promoCode: orderData.promoCode,
        totalText: orderData.totalText,
        product: {
          name: PRODUCT_NAME,
          image: PRODUCT_IMAGE,
          unitPriceText: orderData.unitPriceText,
        },
        customer: {
          comments: String(formData.get("Comments") || "-").trim() || "-",
          name: String(formData.get("Name") || "-").trim() || "-",
          email: String(formData.get("email") || "-").trim() || "-",
          phone: String(formData.get("Phone") || "-").trim() || "-",
        },
      };

      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(snapshot));
      localStorage.removeItem(STORAGE_KEY);

      try {
        await fetch(orderForm.action, {
          method: orderForm.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
      } catch {
        // Redirect anyway so the user receives an in-site confirmation screen.
      } finally {
        window.location.assign("thank-you.html");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", updateFloatingCart);

document.body.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const openTrigger = event.target.closest(
    `[hx-get="${MODAL_ENDPOINT}"]:not(#floating-cart-btn)`
  );
  if (openTrigger) {
    setStoredQty(getStoredQty(0) + 1);
    updateFloatingCart();
  }

  if (event.target.closest("[data-clear-cart]")) {
    localStorage.removeItem(STORAGE_KEY);
    updateFloatingCart();
  }

  if (
    event.target.closest("[data-modal-close]") ||
    event.target.matches("[data-modal-overlay]")
  ) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const modalContainer = getModalContainer();
  if (!modalContainer || !modalContainer.children.length) return;
  closeModal();
});

document.body.addEventListener("htmx:load", updateFloatingCart);

document.body.addEventListener("htmx:afterSwap", (event) => {
  if (event.detail.target.id !== "modal-container") return;
  initModalContent();
});

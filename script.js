const SITE_CONFIG = {
  checkoutUrl: "https://pci.jotform.com/form/261551537343052",
  leadEndpoint: ""
};

const form = document.querySelector("#assessment-form");
const phone = document.querySelector("#phone");
const coupon = document.querySelector("#coupon");
const couponButton = document.querySelector("#apply-coupon");
const couponMessage = document.querySelector("#coupon-message");
const errorMessage = document.querySelector("#form-error");

phone.addEventListener("input", () => {
  const digits = phone.value.replace(/\D/g, "").slice(0, 10);
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);

  if (digits.length > 6) {
    phone.value = `(${area}) ${prefix}-${line}`;
  } else if (digits.length > 3) {
    phone.value = `(${area}) ${prefix}`;
  } else if (digits.length > 0) {
    phone.value = `(${area}`;
  } else {
    phone.value = "";
  }
});

couponButton.addEventListener("click", () => {
  const value = coupon.value.trim();
  couponMessage.textContent = value
    ? "Coupon code will be passed to secure checkout."
    : "Enter a coupon code before applying.";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const data = new FormData(form);
  const payload = {
    firstName: String(data.get("firstName") || "").trim(),
    lastName: String(data.get("lastName") || "").trim(),
    email: String(data.get("email") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    coupon: String(data.get("coupon") || "").trim(),
    termsAccepted: data.get("terms") === "on",
    product: "Golf Performance Assessment",
    price: "79.99"
  };

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
    errorMessage.textContent = "Please complete all required fields.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  if (payload.phone.replace(/\D/g, "").length !== 10) {
    errorMessage.textContent = "Please enter a valid 10-digit phone number.";
    return;
  }

  if (!payload.termsAccepted) {
    errorMessage.textContent = "Please agree to the terms and conditions.";
    return;
  }

  localStorage.setItem("swingStrongAssessment", JSON.stringify(payload));

  if (SITE_CONFIG.leadEndpoint) {
    try {
      await fetch(SITE_CONFIG.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.warn("Lead endpoint failed", error);
    }
  }

  if (SITE_CONFIG.checkoutUrl) {
    const checkout = new URL(SITE_CONFIG.checkoutUrl);
    checkout.searchParams.set("firstName", payload.firstName);
    checkout.searchParams.set("lastName", payload.lastName);
    checkout.searchParams.set("email", payload.email);
    checkout.searchParams.set("phone", payload.phone);
    if (payload.coupon) {
      checkout.searchParams.set("coupon", payload.coupon);
    }
    window.location.href = checkout.toString();
    return;
  }

  window.location.href = "thank-you.html";
});

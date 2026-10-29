
/* ========================================
   SURYAVOLT HYBRID SOLAR ENERGY
   Website JavaScript
======================================== */

"use strict";

// Your WhatsApp number (India country code +91)
const WHATSAPP_NUMBER = "916307680761";

// 1. MOBILE NAVIGATION MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    }
  });
}

// 2. SOLAR CALCULATOR
const solarCalculator = document.getElementById("solarCalculator");
const calculatorResult = document.getElementById("calculatorResult");

if (solarCalculator && calculatorResult) {
  solarCalculator.addEventListener("submit", (event) => {
    event.preventDefault();

    const monthlyBill = Number(
      document.getElementById("monthlyBill").value
    );

    const roofArea = Number(
      document.getElementById("roofArea").value
    );

    const solarType = document.getElementById("solarType").value;

    if (
      !Number.isFinite(monthlyBill) ||
      !Number.isFinite(roofArea) ||
      monthlyBill < 0 ||
      roofArea <= 0
    ) {
      calculatorResult.textContent =
        "Please enter a valid electricity bill and roof area.";
      return;
    }

    /*
      Rough planning assumptions:
      1 kW may need approximately 80–100 sq. ft.
      Actual requirements depend on panels and layout.
    */

    const roofCapacity = roofArea / 100;

    // Approximate capacity inferred from bill.
    // This is only a planning estimate, not a bill-based design.
    const billCapacity = monthlyBill / 600;

    const estimatedCapacity = Math.max(
      0,
      Math.min(roofCapacity, billCapacity)
    );

    const systemSize = Math.round(estimatedCapacity * 10) / 10;

    // Indicative Indian solar yield assumption:
    // approximately 100–140 kWh per kW per month.
    const monthlyUnitsLow = Math.round(systemSize * 100);
    const monthlyUnitsHigh = Math.round(systemSize * 140);

    // Broad illustrative project cost assumptions, not a quote.
    const costPerKw = {
      "on-grid": [45000, 75000],
      "hybrid": [80000, 140000],
      "off-grid": [70000, 120000]
    };

    const selectedCost = costPerKw[solarType] || costPerKw["on-grid"];

    const costLow = Math.round(systemSize * selectedCost[0]);
    const costHigh = Math.round(systemSize * selectedCost[1]);

    const systemNames = {
      "on-grid": "On-grid Solar",
      "hybrid": "Hybrid Solar",
      "off-grid": "Off-grid Solar"
    };

    const formatINR = (amount) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(amount);

    if (systemSize <= 0) {
      calculatorResult.textContent =
        "Your bill suggests that more information is needed. Please contact us for a suitable system estimate.";
      return;
    }

    calculatorResult.innerHTML = `
      <h4>☀ Your Preliminary Solar Estimate</h4>
      <p><strong>System type:</strong> ${systemNames[solarType] || "Solar System"}</p>
      <p><strong>Estimated capacity:</strong> ${systemSize.toFixed(1)} kW</p>
      <p><strong>Possible monthly generation:</strong> ${monthlyUnitsLow}–${monthlyUnitsHigh} units</p>
      <p><strong>Illustrative system cost:</strong> ${formatINR(costLow)} – ${formatINR(costHigh)}</p>
      <p class="note">This is a rough estimate, not a quotation. Actual price and output depend on location, equipment, roof shading, battery size, installation, applicable taxes and current market rates.</p>
      <button type="button" class="btn btn-primary btn-full" id="solarQuoteButton">
        Get a Detailed Quote on WhatsApp
      </button>
    `;

    const solarQuoteButton = document.getElementById("solarQuoteButton");

    if (solarQuoteButton) {
      solarQuoteButton.addEventListener("click", () => {
        const message = [
          "Hello SURYAVOLT HYBRID SOLAR ENERGY,",
          "",
          "I would like a detailed solar quotation.",
          `System type: ${systemNames[solarType]}`,
          `Monthly electricity bill: ${formatINR(monthlyBill)}`,
          `Usable roof area: ${roofArea} sq. ft.`,
          `Estimated system capacity: ${systemSize.toFixed(1)} kW`,
          "",
          "Please help me with the suitable system, actual pricing and installation details."
        ].join("\n");

        openWhatsApp(message);
      });
    }
  });
}

// 3. WHATSAPP HELPER
function openWhatsApp(message) {
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// 4. CONTACT FORM -> WHATSAPP
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName =
      document.getElementById("customerName").value.trim();

    const customerPhone =
      document.getElementById("customerPhone").value.trim();

    const solarType =
      document.getElementById("contactSolarType").value;

    const customerMessage =
      document.getElementById("customerMessage").value.trim();

    if (!customerName || !customerPhone || !solarType) {
      if (contactStatus) {
        contactStatus.textContent =
          "Please fill in your name, phone number and solar requirement.";
      }
      return;
    }

    if (customerName.length > 100 || customerMessage.length > 1000) {
      if (contactStatus) {
        contactStatus.textContent =
          "Please shorten your name or message.";
      }
      return;
    }

    const message = [
      "New enquiry - SURYAVOLT HYBRID SOLAR ENERGY",
      "",
      `Name: ${customerName}`,
      `Customer phone: ${customerPhone}`,
      `Solar requirement: ${solarType}`,
      `Message: ${customerMessage || "No additional message"}`,
      "",
      "Please contact me about this solar enquiry."
    ].join("\n");

    if (contactStatus) {
      contactStatus.textContent =
        "Opening WhatsApp with your enquiry. Please press Send in WhatsApp to submit it.";
    }

    openWhatsApp(message);
  });
}

// 5. AUTOMATIC FOOTER YEAR
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// 6. FLOATING WHATSAPP BUTTON
// Update the link automatically to use the correct number.
document.querySelectorAll(".floating-whatsapp").forEach((button) => {
  const message =
    "Hello SURYAVOLT HYBRID SOLAR ENERGY, I want to know about your solar solutions.";

  button.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  button.target = "_blank";
  button.rel = "noopener noreferrer";
});

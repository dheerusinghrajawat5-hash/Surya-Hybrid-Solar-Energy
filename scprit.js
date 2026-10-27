"use strict";

// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Automatically update copyright year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Solar requirement estimator
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

    if (
      !Number.isFinite(monthlyBill) ||
      !Number.isFinite(roofArea) ||
      monthlyBill < 0 ||
      roofArea < 0
    ) {
      calculatorResult.textContent =
        "Please enter valid bill and roof area values.";
      return;
    }

    if (monthlyBill === 0 || roofArea === 0) {
      calculatorResult.textContent =
        "Accurate rough estimate ke liye bill aur roof area dono zero se zyada enter karein.";
      return;
    }

    // Illustrative assumptions only, not a guaranteed system quote.
    const billBasedCapacity = monthlyBill / 600;
    const roofBasedCapacity = roofArea / 100;
    const estimatedCapacity = Math.min(
      billBasedCapacity,
      roofBasedCapacity
    );

    const formattedCapacity = estimatedCapacity.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 1
      }
    );

    calculatorResult.replaceChildren();

    const heading = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent =
      "Illustrative solar capacity: " + formattedCapacity + " kW";

    heading.appendChild(strong);

    const note = document.createElement("p");
    note.textContent =
      "Yeh sirf initial estimate hai. Actual capacity aur savings ke liye electricity usage, local sunlight, shading aur site inspection check karna zaroori hai.";

    calculatorResult.append(heading, note);
  });
}

// WhatsApp consultation form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName =
      document.getElementById("customerName").value.trim();

    const customerPhone =
      document.getElementById("customerPhone").value.trim();

    const solarType =
      document.getElementById("solarType").value;

    const customerMessage =
      document.getElementById("customerMessage").value.trim();

    if (!customerName || !customerPhone || !solarType) {
      alert("Please fill in your name, phone number and solar requirement.");
      return;
    }

    const message = [
      "Hello SURYAVOLT HYBRID SOLAR ENERGY,",
      "",
      "I would like to enquire about solar solutions.",
      "",
      "Name: " + customerName,
      "Phone: " + customerPhone,
      "Requirement: " + solarType,
      "Message: " + (customerMessage || "No additional message"),
      "",
      "Please contact me with more details."
    ].join("\n");

    const whatsappNumber = "916307680761";
    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    window.location.href = whatsappURL;
  });
}


"use strict";

// Mobile navigation
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

// Copyright year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Solar calculator
const solarCalculator = document.getElementById("solarCalculator");
const calculatorResult = document.getElementById("calculatorResult");

if (solarCalculator && calculatorResult) {
  solarCalculator.addEventListener("submit", (event) => {
    event.preventDefault();

    const billInput = document.getElementById("monthlyBill");
    const roofInput = document.getElementById("roofArea");

    const monthlyBill = Number(billInput.value);
    const roofArea = Number(roofInput.value);

    if (
      billInput.value.trim() === "" ||
      roofInput.value.trim() === "" ||
      !Number.isFinite(monthlyBill) ||
      !Number.isFinite(roofArea) ||
      monthlyBill <= 0 ||
      roofArea <= 0
    ) {
      calculatorResult.textContent =
        "Please enter a bill and roof area greater than zero.";
      return;
    }

    // Illustrative estimate only; not a final system quote.
    const billBasedCapacity = monthlyBill / 600;
    const roofBasedCapacity = roofArea / 100;
    const capacity = Math.min(billBasedCapacity, roofBasedCapacity);

    calculatorResult.replaceChildren();

    const heading = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent =
      "Estimated solar capacity: " +
      capacity.toLocaleString("en-IN", {
        maximumFractionDigits: 1
      }) +
      " kW";

    heading.appendChild(strong);

    const note = document.createElement("p");
    note.textContent =
      "This is a rough estimate, not a quotation. Actual system size depends on electricity usage, location, sunlight, shading and site inspection.";

    calculatorResult.append(heading, note);
  });
}

// Customer consultation form -> WhatsApp
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

// WhatsApp number in international format, digits only.
const whatsappNumber = "916307680761";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = document.getElementById("customerName");
    const phoneField = document.getElementById("customerPhone");
    const typeField = document.getElementById("solarType");
    const messageField = document.getElementById("customerMessage");

    const customerName = nameField.value.trim();
    const customerPhone = phoneField.value.trim();
    const solarType = typeField.value;
    const customerMessage = messageField.value.trim();

    if (!customerName || !customerPhone || !solarType) {
      if (contactStatus) {
        contactStatus.textContent =
          "Please fill in your name, phone number and solar requirement.";
      }
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

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    if (contactStatus) {
      contactStatus.textContent =
        "Opening WhatsApp. If it does not open, use the link below.";
      contactStatus.replaceChildren();

      const statusText = document.createElement("p");
      statusText.textContent =
        "WhatsApp nahi khul raha? Neeche click karein:";

      const whatsappLink = document.createElement("a");
      whatsappLink.href = whatsappURL;
      whatsappLink.target = "_blank";
      whatsappLink.rel = "noopener noreferrer";
      whatsappLink.textContent = "Open WhatsApp";
      whatsappLink.className = "text-link";

      contactStatus.append(statusText, whatsappLink);
    }

    // Direct navigation avoids popup blockers.
    window.location.assign(whatsappURL);
  });
}


"use strict";

/*
  SURYAVOLT HYBRID SOLAR ENERGY

  IMPORTANT:
  Replace the WhatsApp number below with your real business number.
  Use country code + number, digits only, without + or spaces.
  Example format for India: 91XXXXXXXXXX
*/

const WHATSAPP_NUMBER = "916307680761";

document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    mainNav.classList.add("is-open");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu after a navigation link is selected
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close the menu if the user clicks elsewhere
    document.addEventListener("click", (event) => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (
        isOpen &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Reset menu state when returning to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Check that a real WhatsApp number has been configured
  function hasValidWhatsAppNumber() {
    return /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  }

  // Floating WhatsApp button
  const floatingWhatsApp = document.getElementById("floatingWhatsApp");

  if (floatingWhatsApp) {
    floatingWhatsApp.addEventListener("click", (event) => {
      event.preventDefault();

      if (!hasValidWhatsAppNumber()) {
        alert(
          "Please add your real WhatsApp business number in script.js first."
        );
        return;
      }

      const message =
        "Hello Suryavolt Hybrid Solar Energy, I would like to know more about your solar solutions.";

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // Solar enquiry form
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      if (!hasValidWhatsAppNumber()) {
        if (formStatus) {
          formStatus.textContent =
            "Please configure your WhatsApp business number in script.js before sending enquiries.";
        }

        return;
      }

      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const property = String(formData.get("property") || "").trim();
      const location = String(formData.get("location") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const whatsappMessage = [
        "Hello Suryavolt Hybrid Solar Energy!",
        "",
        "I would like to enquire about solar solutions.",
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Property Type: " + property,
        "Location: " + location,
        "Requirements: " + (message || "Not specified"),
        "",
        "Please contact me regarding my enquiry."
      ].join("\n");

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      if (formStatus) {
        formStatus.textContent =
          "WhatsApp is opening. Please review your enquiry and press Send in WhatsApp.";
      }

      const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      // If the browser blocks a new tab, offer a direct link
      if (!whatsappWindow && formStatus) {
        formStatus.textContent =
          "If WhatsApp did not open, allow pop-ups in your browser and try again.";
      }
    });
  }
});

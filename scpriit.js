
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const form = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

document.getElementById("year").textContent =
  new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Customer enquiry form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!form.reportValidity()) return;

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const property = document.getElementById("propertyType").value;
  const solar = document.getElementById("solarType").value;
  const bill = document.getElementById("electricityBill").value;
  const consent = document.getElementById("consent").checked;

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    formMessage.textContent =
      "Please enter a valid 10-digit Indian mobile number.";
    return;
  }

  if (!consent) {
    formMessage.textContent =
      "Please agree before continuing to WhatsApp.";
    return;
  }

  const businessWhatsApp = "916307680761";


  if (!/^91[6-9][0-9]{9}$/.test(businessWhatsApp)) {
    formMessage.textContent =
      "Website setup pending: the company WhatsApp number must be configured.";
    return;
  }

  const enquiry = [
    "Hello Suryavolt Hybrid Solar Energy!",
    "",
    "I would like a solar consultation.",
    "",
    "Name: " + name,
    "Customer Phone: " + phone,
    "City: " + city,
    "Property Type: " + property,
    "Solar Requirement: " + solar,
    "Monthly Electricity Bill: " + bill
  ].join("\n");

  const whatsappURL =
    "https://wa.me/" + businessWhatsApp +
    "?text=" + encodeURIComponent(enquiry);

  const whatsappWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  if (whatsappWindow) {
    formMessage.textContent =
      "WhatsApp opened. Review your enquiry and press Send.";
  } else {
    formMessage.textContent =
      "Please allow pop-ups for this website and try again.";
  }
});

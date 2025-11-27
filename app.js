// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    if (!navLinks.id) navLinks.id = "nav-links";
    navToggle.setAttribute("aria-controls", navLinks.id);
    navToggle.setAttribute("aria-expanded", String(navLinks.classList.contains("open")));
    navLinks.setAttribute("aria-hidden", String(!navLinks.classList.contains("open")));

    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navLinks.setAttribute("aria-hidden", String(!open));
    });
  }

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Gallery lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImage && lightboxClose && galleryItems.length > 0) {
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("aria-modal", "true");

    galleryItems.forEach((img) => {
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        lightboxClose.focus();
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Keyboard accessibility: close lightbox or nav on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("open")) {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
      }
      if (navLinks && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle && navToggle.setAttribute("aria-expanded", "false");
        navLinks.setAttribute("aria-hidden", "true");
      }
    }
  });

  // Contact form validation + mailto (use FormData)
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(contactForm);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !phone || !email || !message) {
        if (formStatus) {
          formStatus.textContent = "Please fill in all the fields.";
          formStatus.classList.remove("success");
          formStatus.classList.add("error");
        }
        return;
      }

      const subject = encodeURIComponent("Enquiry from Danso Stars School Website");
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:2020dssc@gmail.com?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = "Your email application has opened. Please click send to complete.";
        formStatus.classList.remove("error");
        formStatus.classList.add("success");
      }

      contactForm.reset();
    });
  }

  // Newsletter - use FormData and basic email verification
  const newsletterForms = document.querySelectorAll(".newsletter-form");
  if (newsletterForms.length > 0) {
    newsletterForms.forEach((form) => {
      const statusEl = form.querySelector(".newsletter-status");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = String(new FormData(form).get("newsletterEmail") || "").trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          if (statusEl) {
            statusEl.textContent = "Please enter a valid email address.";
            statusEl.classList.remove("success");
            statusEl.classList.add("error");
          }
          return;
        }

        if (statusEl) {
          statusEl.textContent = "Thank you for subscribing! (This is a demo – no email will be sent now.)";
          statusEl.classList.remove("error");
          statusEl.classList.add("success");
        }

        form.reset();
      });
    });
  }

  // Home page hero image slider (5-second interval)
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    const heroSlides = [
      "home page_images/IMG-20251124-WA0078 (1).jpg",
      "home page_images/IMG-20251124-WA0098 (1).jpg",
      "home page_images/IMG-20251124-WA0100 (1).jpg",
      "home page_images/Photo from Humpty Dumpty 🥚.jpg",
    ];

    let currentSlide = 0;

    // Start with the first slide image
    heroImage.src = heroSlides[currentSlide];

    setInterval(() => {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroImage.src = heroSlides[currentSlide];
    }, 5000); // 5 seconds
  }
});



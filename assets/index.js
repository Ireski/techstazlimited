// ===== MOBILE MENU NAVIGATION =====
const mobileMenu = document.getElementById("mobile-nav");
const mobileBtn = document.getElementById("mobile-btn");
const mobileBack = document.getElementById("mobile-back");
const closeBtn = document.getElementById("close-btn");

const toggleMenu = () => {
  // if (mobileMenu && mobileBack) {
  mobileMenu.classList.toggle("active");
  mobileBack.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  // }
};

const closeMenu = () => {
  if (mobileMenu && mobileBack) {
    mobileMenu.classList.remove("active");
    mobileBack.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
};

if (mobileBtn) mobileBtn.addEventListener("click", toggleMenu);
if (closeBtn) closeBtn.addEventListener("click", closeMenu);
if (mobileBack) mobileBack.addEventListener("click", closeMenu);

// Close menu when clicking navigation links inside mobile menu
if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

// ===== NAVIGATION ACTIVE LINK TOGGLER =====
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ===== FAQ ACCORDION (details elements exclusive toggling) =====
const allDetails = document.querySelectorAll("details");
allDetails.forEach((details) => {
  details.addEventListener("toggle", () => {
    if (details.open) {
      allDetails.forEach((other) => {
        if (other !== details) {
          other.removeAttribute("open");
        }
      });
    }
  });
});

// ===== COURSE DROPDOWNS =====
const dropDown = document.getElementById("course-drop");
const dropDownContent = document.getElementById("course-drop-content");
if (dropDown && dropDownContent) {
  dropDown.addEventListener("click", () => {
    dropDownContent.classList.toggle("hidden");
    dropDownContent.classList.toggle("grid");
  });
}

const dataDropDown = document.getElementById("data-drop");
const dataDropDownContent = document.getElementById("data-drop-content");
if (dataDropDown && dataDropDownContent) {
  dataDropDown.addEventListener("click", () => {
    dataDropDownContent.classList.toggle("hidden");
    dataDropDownContent.classList.toggle("grid");
  });
}

// ===== SCROLL REVEAL INTERSECTION OBSERVER =====
const revealEls = document.querySelectorAll(".reveal, .scroll-reveal");
if (revealEls.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => observer.observe(el));
}

// ===== SCROLL PROGRESS BAR AND HEADER STATE =====
// const progressBar = document.getElementById("progress-bar");
// const header =
//   document.getElementById("header") || document.querySelector("header");

// window.addEventListener("scroll", () => {
//   const scrollTop = window.scrollY;

//   // Scroll progress bar
//   if (progressBar) {
//     const docHeight =
//       document.documentElement.scrollHeight - window.innerHeight;
//     const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
//     progressBar.style.width = progress + "%";
//   }

// Header scroll background effect
//   if (header) {
//     if (scrollTop > 50) {
//       header.classList.add("scrolled");
//     } else {
//       header.classList.remove("scrolled");
//     }
//   }
// });

// ===== SMOOTH SCROLL FOR INTERNAL ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const hrefAttr = this.getAttribute("href");
    if (hrefAttr === "#" || hrefAttr === "") return;

    const target = document.querySelector(hrefAttr);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== GSAP SCROLL ANIMATION =====
if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero element stagger fade in
  gsap.from(".hero-content > *", {
    duration: 0.8,
    y: 40,
    opacity: 0,
    stagger: 0.15,
    ease: "power3.out",
    delay: 0.3,
  });

  // Reveal items on scroll using GSAP as well
  document
    .querySelectorAll(".fade-up, .slide-left, .slide-right")
    .forEach((el) => {
      const isLeft = el.classList.contains("slide-left");
      const isRight = el.classList.contains("slide-right");
      const startX = isLeft ? -30 : isRight ? 30 : 0;

      gsap.fromTo(
        el,
        { x: startX, y: startX === 0 ? 30 : 0, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          duration: 0.8,
          x: 0,
          y: 0,
          opacity: 1,
          ease: "power3.out",
        },
      );
    });
}
// });

// ===== CONTACT FORM UTILITIES (Exposed to Global Scope) =====

window.selectChip = function (el, service) {
  document
    .querySelectorAll(".chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  const sel = document.getElementById("serviceSelect");
  if (sel) {
    for (let i = 0; i < sel.options.length; i++) {
      if (
        sel.options[i].text
          .toLowerCase()
          .includes(service.split(" ")[0].toLowerCase())
      ) {
        sel.selectedIndex = i;
        break;
      }
    }
  }
};

window.selectBudget = function (btn) {
  document
    .querySelectorAll(".budget-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
};

// ===== EMAILJS CONFIG =====
// Replace these three values with your own from https://www.emailjs.com
// After creating a free account:
//   EMAILJS_PUBLIC_KEY   → Account > API Keys > Public Key
//   EMAILJS_SERVICE_ID   → Email Services > your service ID (e.g. "service_xxxxxxx")
//   EMAILJS_ADMIN_TEMPLATE_ID  → Email Templates > template for notification to you (e.g. "template_xxxxxxx")
//   EMAILJS_USER_TEMPLATE_ID   → Email Templates > template for auto-reply to user (e.g. "template_xxxxxxx")
const EMAILJS_PUBLIC_KEY = "jYcj0lqmwyTimqsTQ";
const EMAILJS_SERVICE_ID = "service_vecx3uc";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_94jeyhf"; // email sent to techstazlimited@gmail.com
const EMAILJS_USER_TEMPLATE_ID = "template_kesgc0d"; // confirmation email sent to the user

window.submitForm = function () {
  const firstNameEl = document.getElementById("firstName");
  const lastNameEl = document.getElementById("lastName");
  const emailEl = document.getElementById("emailInput");
  const phoneEl = document.getElementById("phoneInput");
  const serviceEl = document.getElementById("serviceSelect");
  const messageEl = document.getElementById("messageInput");

  if (!firstNameEl || !emailEl || !messageEl || !serviceEl) return;

  const fn = firstNameEl.value.trim();
  const ln = lastNameEl ? lastNameEl.value.trim() : "";
  const em = emailEl.value.trim();
  const phone = phoneEl
    ? phoneEl.value.trim() || "Not provided"
    : "Not provided";
  const msg = messageEl.value.trim();
  const svc = serviceEl.value;

  if (!fn || !em || !msg || !svc) {
    [firstNameEl, emailEl, messageEl, serviceEl].forEach((f) => {
      if (!f.value.trim()) {
        f.style.borderColor = "#e05252";
        f.style.animation = "shake .4s ease";
        setTimeout(() => {
          f.style.animation = "";
          f.style.borderColor = "";
        }, 600);
      }
    });
    return;
  }

  const btn = document.querySelector(".submit-btn");
  const btnText = document.getElementById("btnText");
  if (btnText) btnText.textContent = "⏳ Sending...";
  if (btn) btn.disabled = true;

  // Template parameters — these match the variables you set in your EmailJS templates
  const adminParams = {
    from_name: `${fn} ${ln}`.trim(),
    from_email: em,
    phone: phone,
    service: svc,
    message: msg,
    to_email: "techstazlimited@gmail.com",
    reply_to: em,
  };

  const userParams = {
    to_name: fn,
    to_email: em,
    service: svc,
  };

  // Send notification to TechStaz admin
  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      adminParams,
      EMAILJS_PUBLIC_KEY,
    )
    .then(function () {
      // Send confirmation email to the user
      return emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        userParams,
        EMAILJS_PUBLIC_KEY,
      );
    })
    .then(function () {
      const formContent = document.getElementById("formContent");
      const successState = document.getElementById("successState");
      if (formContent) formContent.style.display = "none";
      if (successState) successState.style.display = "block";
    })
    .catch(function (error) {
      console.error("EmailJS error:", error);
      if (btnText) btnText.textContent = "Send Message";
      if (btn) btn.disabled = false;
      alert(
        "Sorry, something went wrong sending your message. Please email us directly at techstazlimited@gmail.com",
      );
    });
};

// ===== CURRICULUM TABS & MODULES (Exposed to Global Scope) =====

window.switchTab = function (tab) {
  document
    .querySelectorAll(".curriculum-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".curriculum-panel")
    .forEach((p) => p.classList.remove("active"));

  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add("active");
  } else if (window.event && window.event.target) {
    window.event.target.classList.add("active");
  }

  const panel = document.getElementById("tab-" + tab);
  if (panel) panel.classList.add("active");
};

window.toggleModule = function (card) {
  const body = card.querySelector(".module-body");
  const icon = card.querySelector(".fa-chevron-down");
  if (body) {
    const isOpen = body.style.display === "block";
    body.style.display = isOpen ? "none" : "block";
    if (icon) {
      icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    }
  }
};

/*
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <!-- Frontend Development -->
          <article class="course-card" style="transition-delay: 0.05s">
            <div
              class="course-card-img"
              style="background-image: url(&quot;/images/hero-1.jpg&quot;)"
              role="img"
              aria-label="Frontend Development course thumbnail"
            ></div>
            <div class="course-card-body">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="text-xs font-bold uppercase text-[#ffb400] bg-amber-50 px-3 py-1 rounded-full"
                  >Development</span
                >
              </div>
              <h2>Frontend Development</h2>
              <p>
                Master HTML, CSS, JavaScript, and React. Build real-world web
                apps from scratch and graduate with a portfolio employers will
                notice.
              </p>
              <hr class="border-gray-100 mb-4" />
              <div
                class="flex items-center justify-between mb-4 text-sm text-gray-500"
              >
                <span
                  ><i
                    class="fa-regular fa-clock text-[#ffb400] mr-1"
                    aria-hidden="true"
                  ></i>
                  10 Weeks</span
                >
                <span
                  ><i
                    class="fa-solid fa-coins text-[#ffb400] mr-1"
                    aria-hidden="true"
                  ></i>
                  ₦120,000</span
                >
              </div>
              <a
                href="/frontend-dev"
                class="block bg-[#ffb400] font-semibold text-white py-3 px-6 rounded-full text-center linker"
              >
                Enquire &amp; Enroll
                <i
                  class="fa-solid fa-chevron-right ml-1"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </article>

          <!-- Web Design -->
          <article class="course-card" style="transition-delay: 0.1s">
            <div
              class="course-card-img"
              style="background-image: url(&quot;/images/hero-2.jpg&quot;)"
              role="img"
              aria-label="Web Design course thumbnail"
            ></div>
            <div class="course-card-body">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="text-xs font-bold uppercase text-[#ffb400] bg-amber-50 px-3 py-1 rounded-full"
                  >Design</span
                >
              </div>
              <h2>Web Design (Wordpress)</h2>
              <p>
                Learn how to design and build professional websites using
                WordPress — the world’s most popular website platform.
              </p>
              <hr class="border-gray-100 mb-4" />
              <div
                class="flex items-center justify-between mb-4 text-sm text-gray-500"
              >
                <span
                  ><i
                    class="fa-regular fa-clock text-[#ffb400] mr-1"
                    aria-hidden="true"
                  ></i>
                  3 Weeks</span
                >
                <span
                  ><i
                    class="fa-solid fa-coins text-[#ffb400] mr-1"
                    aria-hidden="true"
                  ></i>
                  ₦40,000</span
                >
              </div>
              <a
                href="/web-design"
                class="block bg-[#ffb400] font-semibold text-white py-3 px-6 rounded-full text-center linker"
              >
                Enquire &amp; Enroll
                <i
                  class="fa-solid fa-chevron-right ml-1"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </article>

          <!-- Data Analytics -->
          <article class="course-card" style="transition-delay: 0.15s">
            <div
              class="course-card-img"
              style="
                background-image: url(&quot;/images/hero-3.jpg&quot;);
                background-position: center;
              "
              role="img"
              aria-label="Data Analytics course thumbnail"
            ></div>
            <div class="course-card-body">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="text-xs font-bold uppercase text-[#ffb400] bg-amber-50 px-3 py-1 rounded-full"
                  >Data</span
                >
              </div>
              <h2>Data Analytics</h2>
              <p>
                From Excel to Python — collect, clean, visualise, and
                communicate data insights that drive real business decisions.
              </p>
              <hr class="border-gray-100 mb-4" />
              <div
                class="flex items-center justify-between mb-4 text-sm text-gray-500"
              >
                <span
                  ><i
                    class="fa-regular fa-clock text-[#ffb400] mr-1"
                    aria-hidden="true"
                  ></i>
                  6 Weeks</span
                >
                <span
                  ><i
                    class="fa-solid fa-coins text-[#ffb400] mr-1"
                    aria-hidden="true"
                  ></i>
                  ₦70,000</span
                >
              </div>
              <a
                href="/data"
                class="block bg-[#ffb400] font-semibold text-white py-3 px-6 rounded-full text-center linker"
              >
                Enquire &amp; Enroll
                <i
                  class="fa-solid fa-chevron-right ml-1"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </article>
        </div> 
*/

// ===== DYNAMIC REGISTRATION MODAL POPUP =====
document.addEventListener("DOMContentLoaded", () => {
  // 1. Create and inject modal template
  const modalHTML = `
    <div class="ts-modal-overlay" id="tsRegisterModal" aria-hidden="true" role="dialog">
      <div class="ts-modal-container">
        <button class="ts-modal-close" id="tsModalCloseBtn" aria-label="Close modal">&times;</button>
        <div class="ts-modal-header">
          <span class="ts-modal-badge">Enrollment Process</span>
          <h3>Complete Your Registration</h3>
          <p>Follow these quick steps to secure your seat at TechStaz Academy.</p>
        </div>
        <div class="ts-modal-steps">
          <div class="ts-modal-step">
            <div class="ts-step-num">1</div>
            <div class="ts-step-content">
              <h4>Message Us on WhatsApp</h4>
              <p>Click below to open a chat with our admissions officer on WhatsApp.</p>
            </div>
          </div>
          <div class="ts-modal-step">
            <div class="ts-step-num">2</div>
            <div class="ts-step-content">
              <h4>Make Payment</h4>
              <p>Complete your tuition tuition payment (full or installment) via the provided bank details.</p>
            </div>
          </div>
          <div class="ts-modal-step">
            <div class="ts-step-num">3</div>
            <div class="ts-step-content">
              <h4>Fill Registration Form</h4>
              <p>Receive your unique enrollment link to fill out the registration form and start learning.</p>
            </div>
          </div>
        </div>
        <div class="ts-modal-footer">
          <a href="https://api.whatsapp.com/send/?phone=2347035865583" target="_blank" rel="noopener noreferrer" class="ts-modal-btn" id="tsModalWhatsappBtn">
            <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp to Register
          </a>
          <span class="ts-modal-note">Have questions? We reply instantly.</span>
        </div>
      </div>
    </div>
  `;

  // Inject modal into body
  if (!document.getElementById("tsRegisterModal")) {
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const modal = document.getElementById("tsRegisterModal");
  const closeBtn = document.getElementById("tsModalCloseBtn");

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    }
  };

  // 2. Add click event listeners to all "Register Now" buttons
  const findAndBindRegisterButtons = () => {
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"]',
    );
    interactiveElements.forEach((el) => {
      // Ensure we don't bind to elements within our modal
      if (el.closest("#tsRegisterModal")) return;

      const text = el.textContent || el.innerText;
      if (text && text.trim().toLowerCase().includes("register now")) {
        // Avoid duplicate listener bindings by marking the element
        if (!el.dataset.tsBound) {
          el.dataset.tsBound = "true";
          el.addEventListener("click", openModal);
        }
      }
    });
  };

  findAndBindRegisterButtons();

  // Also bind to any dynamically loaded buttons if any
  const observer = new MutationObserver((mutations) => {
    findAndBindRegisterButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 3. Modal close interactions
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      // If click is directly on overlay background, close modal
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escape key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

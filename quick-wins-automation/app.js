/* --------------------------------------------------------------------
   PATCH: Fix animated counters & refactor observer logic
   ------------------------------------------------------------------*/
(() => {
  "use strict";

  /* -------------------------- Utilities --------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------ Scroll Animation Manager -------------------- */
  class ScrollAnimationManager {
    constructor() {
      this.observer = null;
      if ("IntersectionObserver" in window && !prefersReducedMotion) {
        this.initObserver();
      } else {
        // Fallback
        $$(".reveal").forEach((el) => el.classList.add("visible"));
        $$("[data-counter]").forEach((el) => (el.textContent = el.dataset.counter + (el.dataset.suffix || "")));
      }
    }

    initObserver() {
      const options = { threshold: 0.18 };
      this.observer = new IntersectionObserver((entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Animate any counters inside the target once it becomes visible
            $$('[data-counter]', entry.target).forEach((el) => this.animateCounter(el));
            obs.unobserve(entry.target);
          }
        }
      }, options);

      $$(".reveal").forEach((el) => this.observer.observe(el));
    }

    animateCounter(el) {
      const endValue = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      const duration = 1200;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const current = Math.floor(progress * endValue);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  /* ------------------- Quick Wins Presentation -------------------- */
  class QuickWinsPresentation {
    constructor() {
      this.data = this.loadData();
      this.renderFramework();
      this.bindSmoothScroll();
      new ScrollAnimationManager();
    }

    loadData() {
      return JSON.parse(document.getElementById("app-data").textContent);
    }

    renderFramework() {
      const list = $("#frameworkSteps");
      list.innerHTML = this.data.quickWinsFramework
        .map(
          (step) => `
        <li class="framework-step reveal">
          <span class="framework-step__number">${step.step}</span>
          <h3 class="mb-8">${step.title}</h3>
          <p>${step.description}</p>
        </li>`
        )
        .join("");
    }

    /* -------------------- Interactions --------------------------- */
    bindSmoothScroll() {
      $$('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
          const id = link.getAttribute("href").substring(1);
          const dest = document.getElementById(id);
          if (dest) {
            e.preventDefault();
            dest.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => new QuickWinsPresentation());
})();

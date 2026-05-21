// Index each word card so its reveal animation can stagger
document.querySelectorAll(".word-grid .word-card").forEach((card, i) => {
  card.style.setProperty("--card-i", i);
});

// Hero: swap line 1 → line 2 with whole-line fade after a beat
const heroSwapDelay = 2000;
window.setTimeout(() => {
  document.body.classList.add("hero-swapped");
}, heroSwapDelay);

// Reveal sections + their inner content as they scroll into view
const revealTargets = document.querySelectorAll("[data-reveal]");
if (revealTargets.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  // Fallback: show immediately if IO not supported
  revealTargets.forEach((el) => el.classList.add("reveal-in"));
}

// Word card expand/collapse on click
document.querySelectorAll(".word-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isExpanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!isExpanded));
  });
});

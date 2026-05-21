// Index each word card so its reveal animation can stagger
document.querySelectorAll(".word-grid .word-card").forEach((card, i) => {
  card.style.setProperty("--card-i", i);
});

// Hero: trigger line-1 entrance on next frame (double rAF guarantees
// the browser has committed initial state before the transition fires)
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.body.classList.add("hero-loaded");
  });
});

// Swap: line 1 fades OUT first, then line 2 fades IN (sequential, not crossfade)
const heroSwapDelay = 1800;
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

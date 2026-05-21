// Split hero text into per-letter spans for stagger animation
function splitHeroLetters() {
  document.querySelectorAll(".hero-line").forEach((line) => {
    const text = line.textContent.trim();
    line.setAttribute("aria-label", text);
    line.textContent = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "hl-letter";
      span.textContent = char === " " ? " " : char;
      span.style.setProperty("--i", i);
      span.setAttribute("aria-hidden", "true");
      line.appendChild(span);
    });
  });
}

splitHeroLetters();

// Index each card so its reveal animation can stagger
document.querySelectorAll(".word-grid .word-card").forEach((card, i) => {
  card.style.setProperty("--card-i", i);
});

// Swap from line 1 to line 2 after the first stagger has played out
const heroSwapDelay = 2400;
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

const heroSwapDelay = 1800;
const cardSelector = ".word-card";

window.setTimeout(() => {
  document.body.classList.add("hero-swapped");
}, heroSwapDelay);

document.querySelectorAll(cardSelector).forEach((card) => {
  card.addEventListener("click", () => {
    const isExpanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!isExpanded));
  });
});

const marquee = document.querySelector(".trust-marquee");
const track = document.querySelector(".trust-track");
const group = document.querySelector(".trust-group");

if (marquee && track && group) {
  // Remove any existing duplicate groups
  track.querySelectorAll(".trust-group:not(:first-child)")
    .forEach(item => item.remove());

  // Add enough copies to fill the viewport
  const groupWidth = group.getBoundingClientRect().width;
  track.style.setProperty("--group-width", `${groupWidth}px`);
  const copies = Math.max(
    2,
    Math.ceil(marquee.clientWidth / groupWidth) + 1
  );

  for (let i = 1; i < copies; i++) {
    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
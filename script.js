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

const quoteForm = document.getElementById("quote-form");
const formStatus = document.getElementById("form-status");

quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);

    const quoteData = {
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        message: formData.get("message")
    };

    formStatus.textContent = "Sending your request...";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/quote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quoteData)
        });

        if (response.status === 429) {
            formStatus.textContent =
                "Too many requests. Please wait a minute before trying again.";
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to submit quote request");
}

        formStatus.textContent = "Your request has been submitted successfully!";
        quoteForm.reset();

    } catch (error) {
        console.error("Quote submission error:", error);
        formStatus.textContent = "Something went wrong. Please try again.";
    }
});
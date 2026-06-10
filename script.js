const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const testimonials = [
  {
    text: 'Table Culture has been our trusted partner for over five years. The quality of Thomas Bragard uniforms is unmatched, and our kitchen team takes great pride in wearing them.',
    name: 'Marco Rossi',
    role: 'Executive Chef, Atlantis The Royal Dubai'
  },
  {
    text: 'Their service is professional, fast, and consistent. The embroidery quality and garment finish always meet the standards we expect for our hospitality team.',
    name: 'Layla Mansour',
    role: 'Operations Director, Luxury Hotel Group'
  },
  {
    text: 'The uniforms are elegant, durable, and comfortable through long kitchen shifts. Table Culture understands what professional chefs actually need.',
    name: 'Jean Moreau',
    role: 'Culinary Director, Dubai Hospitality Academy'
  }
];

let currentTestimonial = 0;
const textEl = document.getElementById('testimonialText');
const nameEl = document.getElementById('testimonialName');
const roleEl = document.getElementById('testimonialRole');
const dotsEl = document.getElementById('testimonialDots');

function renderDots() {
  dotsEl.innerHTML = '';
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    if (index === currentTestimonial) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      renderTestimonial();
    });
    dotsEl.appendChild(dot);
  });
}

function renderTestimonial() {
  const item = testimonials[currentTestimonial];
  textEl.textContent = item.text;
  nameEl.textContent = item.name;
  roleEl.textContent = item.role;
  renderDots();
}

document.getElementById('prevTestimonial').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});

document.getElementById('nextTestimonial').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  renderTestimonial();
});

renderTestimonial();

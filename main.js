// === NAV MOBILE TOGGLE ===
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === SMOOTH ACTIVE NAV ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// === CONTACT FORM (Formspree-ready) ===
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = new FormData(form);

  // --- SWAP THIS URL for your real Formspree endpoint ---
  // Sign up free at formspree.io, create a form, copy the action URL
  // Example: https://formspree.io/f/yourFormId
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.reset();
      success.style.display = 'block';
      btn.textContent = 'Get a Free Quote';
      btn.disabled = false;
      setTimeout(() => success.style.display = 'none', 5000);
    } else {
      throw new Error('Server error');
    }
  } catch {
    // Fallback: mailto if Formspree not set up yet
    alert('Form not connected yet. Please email us directly at blackstonepropertyservices@email.com');
    btn.textContent = 'Get a Free Quote';
    btn.disabled = false;
  }
});
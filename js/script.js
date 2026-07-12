/* ==========================================================================
   Advocate Narender Kumar — Main Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('loaded'), 300);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => preloader && preloader.classList.add('loaded'), 2000);

  /* ---------- AOS init (falls back gracefully if library didn't load) ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  } else {
    // Lightweight fallback: reveal-on-scroll for [data-aos] elements
    const targets = document.querySelectorAll('[data-aos]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aos-animate'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
  }

  /* ---------- Sticky header ---------- */
  const header = document.querySelector('.site-header');
  const onScrollHeader = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader);

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
  });

  /* ---------- Mobile nav toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function closeNav() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
  }
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('open');
    });
    navOverlay.addEventListener('click', closeNav);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }

  /* ---------- Dark mode toggle ---------- */
  const darkToggle = document.getElementById('darkModeToggle');
  const savedTheme = sessionStorage.getItem('nk_theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      sessionStorage.setItem('nk_theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Swiper testimonials ---------- */
  if (window.Swiper) {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 }
      }
    });
  }

  /* ---------- Contact form validation + EmailJS submit ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = {
        name: { el: form.querySelector('#name'), test: v => v.trim().length >= 2 },
        phone: { el: form.querySelector('#phone'), test: v => /^[0-9+\-\s]{10,15}$/.test(v.trim()) },
        email: { el: form.querySelector('#email'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
        message: { el: form.querySelector('#message'), test: v => v.trim().length >= 10 }
      };

      Object.values(fields).forEach(({ el, test }) => {
        if (!el) return;
        const group = el.closest('.form-group');
        if (!test(el.value)) { group.classList.add('error'); valid = false; }
        else { group.classList.remove('error'); }
      });

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const templateParams = {
        name: fields.name.el.value.trim(),
        phone: fields.phone.el.value.trim(),
        email: fields.email.el.value.trim(),
        message: fields.message.el.value.trim()
      };

      emailjs.send('service_nsuz4e8', 'template_fcj262t', templateParams)
        .then(() => {
          form.reset();
          const successMsg = document.getElementById('formSuccess');
          if (successMsg) {
            successMsg.classList.add('show');
            setTimeout(() => successMsg.classList.remove('show'), 6000);
          }
        })
        .catch((err) => {
          alert('Sorry, something went wrong sending your message. Please call us directly at +91 9416215389.');
          console.error('EmailJS error:', err);
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });

    // live-clear error state on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => input.closest('.form-group').classList.remove('error'));
    });
  }

  /* ---------- Set active nav link based on current page ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

});
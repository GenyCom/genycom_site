/**
 * GENYCOM — main.js v2
 * EmailJS form · WhatsApp · Navbar · Counters · Reveal
 *
 * ── CONFIGURATION EMAILJS ───────────────────────────────────────────────────
 * 1. Créez un compte GRATUIT sur https://www.emailjs.com
 * 2. Ajoutez un "Email Service" → Gmail → connectez genycomc@gmail.com
 * 3. Créez un "Email Template" avec ces variables :
 *       {{from_name}}  {{reply_to}}  {{company}}  {{phone}}  {{sector}}  {{message}}
 *    Dans le template, mettez "To Email" = genycomc@gmail.com
 * 4. Copiez vos clés dans les 3 constantes ci-dessous.
 * ────────────────────────────────────────────────────────────────────────────
 */

'use strict';

// ============================================================
//  ★  PARAMÈTRES EMAILJS  ← À REMPLIR
// ============================================================
const EMAILJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY';   // onglet Account > API Keys
const EMAILJS_SERVICE_ID  = 'VOTRE_SERVICE_ID';   // onglet Email Services
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';  // onglet Email Templates

// ============================================================
//  INITIALISATION EMAILJS
// ============================================================
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'VOTRE_PUBLIC_KEY') {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// ============================================================
//  1. NAVBAR — scroll + mobile toggle
// ============================================================
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.classList.toggle('active', open);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      });
    });
  }
})();

// ============================================================
//  2. REVEAL ON SCROLL
// ============================================================
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ============================================================
//  3. ANIMATED COUNTERS
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;
  const ease = t => t * (2 - t);
  function animate(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1800;
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(ease(p) * target).toLocaleString('fr-FR');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('fr-FR');
    })(start);
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

// ============================================================
//  4. BACK TO TOP
// ============================================================
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ============================================================
//  5. FOOTER YEAR
// ============================================================
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// ============================================================
//  6. ACTIVE NAV LINK on scroll
// ============================================================
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 100;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        links.forEach(l => {
          l.classList.remove('active-link');
          if (l.getAttribute('href') === `#${sec.id}`) l.classList.add('active-link');
        });
      }
    });
  }, { passive: true });
})();

// ============================================================
//  7. SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' }); }
  });
});

// ============================================================
//  8. CONTACT FORM — EmailJS + fallback mailto
// ============================================================
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nomEl     = document.getElementById('nom');
  const emailEl   = document.getElementById('email');
  const messageEl = document.getElementById('message');
  const nomErr    = document.getElementById('nomError');
  const emailErr  = document.getElementById('emailError');
  const msgErr    = document.getElementById('messageError');
  const notice    = document.getElementById('formNotice');
  const submitBtn = document.getElementById('submitBtn');

  function setError(input, errEl, msg) {
    input.classList.add('error');
    errEl.textContent = msg;
  }
  function clearError(input, errEl) {
    input.classList.remove('error');
    errEl.textContent = '';
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validate() {
    let ok = true;
    const n = nomEl.value.trim();
    const e = emailEl.value.trim();
    const m = messageEl.value.trim();

    if (!n) { setError(nomEl, nomErr, 'Veuillez saisir votre nom.'); ok = false; }
    else clearError(nomEl, nomErr);

    if (!e) { setError(emailEl, emailErr, 'Veuillez saisir votre email.'); ok = false; }
    else if (!isEmail(e)) { setError(emailEl, emailErr, 'Adresse email invalide.'); ok = false; }
    else clearError(emailEl, emailErr);

    if (!m || m.length < 10) { setError(messageEl, msgErr, 'Message trop court (min. 10 caractères).'); ok = false; }
    else clearError(messageEl, msgErr);

    return ok;
  }

  [nomEl, emailEl, messageEl].forEach(el => {
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) clearError(el,
        el === nomEl ? nomErr : el === emailEl ? emailErr : msgErr);
    });
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.innerHTML = on
      ? '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'
      : '<i class="fas fa-paper-plane"></i> Envoyer ma demande';
  }

  function showNotice(type, msg) {
    notice.className = 'form-notice ' + type;
    notice.textContent = msg;
  }

  // ---- Fallback mailto ----
  function fallbackMailto() {
    const data = collectData();
    const subj = encodeURIComponent(`[GenyCom] Demande de démo — ${data.from_name}`);
    const body = encodeURIComponent(
      `Nom: ${data.from_name}\nEmail: ${data.reply_to}\n` +
      `Société: ${data.company||'—'}\nTéléphone: ${data.phone||'—'}\n` +
      `Secteur: ${data.sector||'—'}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:genycomc@gmail.com?subject=${subj}&body=${body}`;
    showNotice('success', '✓ Votre client mail va s\'ouvrir. Envoyez l\'email pour finaliser.');
    form.reset();
  }

  function collectData() {
    return {
      from_name: nomEl.value.trim(),
      reply_to:  emailEl.value.trim(),
      company:   document.getElementById('societe').value.trim(),
      phone:     document.getElementById('telephone').value.trim(),
      sector:    document.getElementById('secteur').value,
      message:   messageEl.value.trim(),
    };
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    notice.className = 'form-notice';
    notice.textContent = '';

    // ── EmailJS disponible et configuré ? ──
    const emailjsReady = (
      typeof emailjs !== 'undefined' &&
      EMAILJS_PUBLIC_KEY  !== 'VOTRE_PUBLIC_KEY' &&
      EMAILJS_SERVICE_ID  !== 'VOTRE_SERVICE_ID' &&
      EMAILJS_TEMPLATE_ID !== 'VOTRE_TEMPLATE_ID'
    );

    if (emailjsReady) {
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, collectData());
        showNotice('success', '✓ Votre demande a bien été envoyée ! Nous vous répondrons sous 24h.');
        form.reset();
      } catch (err) {
        console.error('EmailJS error:', err);
        // Bascule sur mailto si EmailJS échoue
        fallbackMailto();
      }
    } else {
      // Pas encore configuré → ouvre directement le client mail
      await new Promise(r => setTimeout(r, 500));
      fallbackMailto();
    }

    setLoading(false);
  });
})();

// ============================================================
//  Styles dynamiques injectés (nav active link + toggle anim)
// ============================================================
const s = document.createElement('style');
s.textContent = `
  .nav-links a.active-link { color: var(--primary) !important; }
  .nav-toggle.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-toggle.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(s);

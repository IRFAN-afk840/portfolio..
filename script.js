/* =============================================
   IMS458: E-Resume Website - External JS
   Name: Muhamad Adib Irfan Bin Khairuddin
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile Nav Toggle ---- */
  const toggle  = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---- Active Nav Link (highlight current page) ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(function (link) {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { obs.observe(el); });
  }

  /* ---- Skill Bar Animation ---- */
  const bars = document.querySelectorAll('.skill-fill');
  if (bars.length) {
    const barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct;
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { b.style.width = '0'; barObs.observe(b); });
  }

  /* ---- Contact Form Validation ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('fname').value.trim();
      var email   = document.getElementById('femail').value.trim();
      var subject = document.getElementById('fsubject').value.trim();
      var message = document.getElementById('fmessage').value.trim();
      var msgBox  = document.getElementById('formMsg');

      if (!name || !email || !message) {
        show(msgBox, 'Sila isi semua ruangan yang diperlukan.', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show(msgBox, 'Sila masukkan alamat e-mel yang sah.', 'error'); return;
      }
      show(msgBox, '✓ Mesej anda telah berjaya dihantar! Terima kasih.', 'success');
      form.reset();
    });
  }

  function show(el, text, type) {
    if (!el) return;
    el.textContent = text; el.className = 'form-msg ' + type; el.style.display = 'block';
    setTimeout(function () { el.style.display = 'none'; }, 5000);
  }

  /* ---- Audio player label feedback ---- */
  var audio = document.querySelector('audio');
  if (audio) {
    audio.addEventListener('play',  function () { var l = document.querySelector('.audio-label'); if (l) l.textContent = '▶ Sedang dimainkan…'; });
    audio.addEventListener('pause', function () { var l = document.querySelector('.audio-label'); if (l) l.textContent = '⏸ Dijeda'; });
    audio.addEventListener('ended', function () { var l = document.querySelector('.audio-label'); if (l) l.textContent = '⏹ Selesai'; });
  }

  /* ---- Back to top smooth ---- */
  document.querySelectorAll('.back-top').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

});

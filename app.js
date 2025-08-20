// År i sidfoten
document.getElementById('year').textContent = new Date().getFullYear();

// Mobilmeny
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Stäng meny' : 'Öppna meny');
  });

  // Stäng menyn när man klickar på en länk (mobil)
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// FAQ-accordion
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (answer) {
      answer.hidden = expanded;
    }
  });
});

// Enkelt formulär (demo) – validering & "skickat"-status
const form = document.getElementById('tipsForm');
const status = document.getElementById('formStatus');

if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const place = (data.get('place') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!place) {
      status.textContent = 'Ange minst en plats/tips.';
      status.style.color = '#ffd166';
      return;
    }

    // Demo: spara lokalt i sessionStorage
    const tip = { name, place, message, at: new Date().toISOString() };
    const existing = JSON.parse(sessionStorage.getItem('vt_tips') || '[]');
    existing.push(tip);
    sessionStorage.setItem('vt_tips', JSON.stringify(existing));

    status.textContent = 'Tack för ditt tips! (sparat lokalt i din webbläsare)';
    status.style.color = '#66d9a3';
    form.reset();
  });
}

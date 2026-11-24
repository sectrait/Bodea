/* Bodea site behaviour. No inline scripts; all user-derived text is written with textContent. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Keep the layout clean when an optional image asset is unavailable.
  var hideMissingImage = function (img) {
    img.hidden = true;
    if (img.parentElement) img.parentElement.classList.add('missing-image');
  };
  document.addEventListener('error', function (event) {
    if (event.target && event.target.tagName === 'IMG') hideMissingImage(event.target);
  }, true);
  $$('img').forEach(function (img) {
    if (img.complete && !img.naturalWidth) hideMissingImage(img);
  });

  // Mobile nav
  var hdr = $('.site-header'), mb = $('.menu-btn');
  if (hdr && mb) mb.addEventListener('click', function () {
    var open = hdr.classList.toggle('open');
    mb.setAttribute('aria-expanded', String(open));
  });

  // Carousel
  var car = $('[data-carousel]');
  if (car) {
    var slides = $$('.slide', car), dots = $$('.dots button'), idx = 0, timer;
    var show = function (i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('on', n === idx); });
      dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === idx)); });
    };
    var auto = function () { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, 7000); };
    dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); auto(); }); });
    var prev = $('[data-prev]'), next = $('[data-next]');
    if (prev) prev.addEventListener('click', function () { show(idx - 1); auto(); });
    if (next) next.addEventListener('click', function () { show(idx + 1); auto(); });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) auto();
  }

  // Accordion
  $$('.acc-item').forEach(function (item) {
    var b = $('button', item), p = $('.panel', item);
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      p.hidden = open;
    });
  });

  // Email validation helper
  var EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

  // Newsletter / contact forms (demo: nothing is transmitted)
  $$('form[data-newsletter]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = $('input[type=email]', f), msg = $('.form-msg', f.parentNode);
      var ok = EMAIL.test(inp.value.trim()) && inp.value.length <= 320;
      msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
      msg.textContent = ok ? 'Thank you. You are on the list.' : 'Please enter a valid email address.';
      if (ok) f.reset();
    });
  });

  // Generic validated forms (login, register, webinar)
  $$('form[data-validate]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      $$('.field', f).forEach(function (fl) {
        var i = $('input,select', fl), v = i.value.trim(), bad = false;
        if (i.required && !v) bad = true;
        if (i.type === 'email' && v && !EMAIL.test(v)) bad = true;
        if (i.type === 'password' && v && v.length < 8) bad = true;
        if (i.maxLength > 0 && v.length > i.maxLength) bad = true;
        fl.classList.toggle('bad', bad);
        if (bad) valid = false;
      });
      var c = $('input[type=checkbox][required]', f);
      if (c && !c.checked) valid = false;
      var msg = $('.form-msg', f);
      msg.className = 'form-msg ' + (valid ? 'ok' : 'err');
      msg.textContent = valid ? (f.getAttribute('data-ok') || 'Thank you.') : 'Please complete the highlighted fields.';
      if (valid) f.reset();
    });
  });

  // Header search -> publications page
  $$('form.search').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('input', f).value.trim().slice(0, 80);
      window.location.href = 'publications.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  });

  // Publications: filters, search and load more
  var grid = $('#pubs');
  if (grid) {
    var cards = $$('.card', grid), selY = $('#f-year'), selT = $('#f-topic'), selI = $('#f-industry');
    var more = $('#load-more'), empty = $('#empty'), shown = 12;
    var q = (new URLSearchParams(window.location.search).get('q') || '').toLowerCase().slice(0, 80);
    var apply = function (reset) {
      if (reset) shown = 12;
      var n = 0, total = 0;
      cards.forEach(function (c) {
        var m = (!selY.value || c.dataset.year === selY.value) &&
                (!selT.value || c.dataset.topic === selT.value) &&
                (!selI.value || c.dataset.industry === selI.value) &&
                (!q || c.textContent.toLowerCase().indexOf(q) > -1);
        if (m) total++;
        var vis = m && n < shown;
        if (m) n++;
        c.hidden = !vis;
      });
      more.hidden = total <= shown;
      empty.hidden = total > 0;
    };
    [selY, selT, selI].forEach(function (s) { s.addEventListener('change', function () { apply(true); }); });
    more.addEventListener('click', function () { shown += 4; apply(false); });
    if (q) { var si = $('.search input'); if (si) si.value = q; }
    apply(true);
  }

  // Video teaser
  var v = $('.video');
  if (v) v.addEventListener('click', function () {
    var m = $('#video-msg'); if (m) m.textContent = 'The teaser plays here in the live version. Register to unlock the full webinar.';
  });

  // Chat widget
  var fab = $('.chat-fab'), pop = $('.chat-pop');
  if (fab && pop) fab.addEventListener('click', function () {
    pop.hidden = !pop.hidden; fab.setAttribute('aria-expanded', String(!pop.hidden));
  });

  // Footer year-safe: nothing dynamic needed.
})();

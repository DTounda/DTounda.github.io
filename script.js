// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Contact form: no backend on this static site, so we hand the
  // message to the visitor's own mail client instead of pretending
  // to submit it somewhere.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(message + '\n\nFrom ' + name + ' (' + email + ')');
      var mailto = 'mailto:toundanana@gmail.com?subject=' + subject + '&body=' + body;

      var success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
      window.location.href = mailto;
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initScrollReveal(reduceMotion);
  initTypewriter(reduceMotion);
  initCountUp(reduceMotion);
});

// Fades + slides elements with class "reveal" into place as they enter
// the viewport, using IntersectionObserver so nothing is measured or
// animated until it's actually about to be seen.
function initScrollReveal(reduceMotion) {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
}

// Types out the homepage status line character by character, then lets
// the existing blinking cursor take over. Skips straight to full text
// if the browser has no JS support for it or the visitor prefers
// reduced motion.
function initTypewriter(reduceMotion) {
  var target = document.querySelector('[data-typewriter]');
  if (!target) return;

  var fullText = target.textContent;
  if (reduceMotion) return;

  target.textContent = '';
  var i = 0;
  (function step() {
    if (i <= fullText.length) {
      target.textContent = fullText.slice(0, i);
      i++;
      setTimeout(step, 20);
    }
  })();
}

// Counts a stat number up from 0 to its target value once it scrolls
// into view. Only applies to stat cards carrying a data-count-to
// attribute; the non-numeric stats (like "FR / EN") are left alone.
function initCountUp(reduceMotion) {
  var nums = document.querySelectorAll('[data-count-to]');
  if (!nums.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    nums.forEach(function (el) { el.textContent = el.getAttribute('data-count-to'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count-to'), 10);
      var duration = 900;
      var startTime = null;

      function frame(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.round(progress * target);
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  nums.forEach(function (el) { observer.observe(el); });
}

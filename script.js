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
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      var mailto = 'mailto:toundanana@gmail.com?subject=' + subject + '&body=' + body;

      var success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
      window.location.href = mailto;
    });
  }
});

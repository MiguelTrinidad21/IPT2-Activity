
(function () {
  'use strict';

  var DEMO_EMAIL = 'demo@northbound.studio';
  var DEMO_PASSWORD = 'northbound123';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('login-form');
    if (!form) return;

    var errorAlert = document.getElementById('login-error');
    var successAlert = document.getElementById('login-success');
    var toggleBtn = document.getElementById('toggle-password');
    var passwordInput = document.getElementById('password');

    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', function () {
        var isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        toggleBtn.textContent = isHidden ? 'Hide' : 'Show';
        toggleBtn.setAttribute('aria-pressed', isHidden ? 'true' : 'false');
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      successAlert.classList.remove('show');
      errorAlert.classList.remove('show');

      var email = form.querySelector('#email');
      var password = form.querySelector('#password');
      var emailVal = email.value.trim();
      var passwordVal = password.value;

      var valid = true;
      valid = requireField(email, 'Enter your email to continue.') && valid;
      valid = requireField(password, 'Enter your password to continue.') && valid;
      if (!valid) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in\u2026';

      
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';

        if (emailVal === DEMO_EMAIL && passwordVal === DEMO_PASSWORD) {
          successAlert.classList.add('show');
          setTimeout(function () {
            window.location.href = 'dashboard.html';
          }, 700);
        } else {
          errorAlert.classList.add('show');
        }
      }, 500);
    });

    function requireField(input, message) {
      var wrap = input.closest('.field');
      if (!input.value.trim()) {
        wrap.classList.add('has-error');
        var errorEl = wrap.querySelector('.field-error');
        if (errorEl) errorEl.textContent = message;
        return false;
      }
      wrap.classList.remove('has-error');
      return true;
    }
  });
})();

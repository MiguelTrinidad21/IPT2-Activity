
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var successAlert = document.getElementById('form-success');
    var errorAlert = document.getElementById('form-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideAlerts();

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');

      var valid = true;
      valid = validateRequired(name, 'Please tell us your name.') && valid;
      valid = validateEmail(email) && valid;
      valid = validateRequired(message, 'Add a short message so we know how to help.') && valid;

      if (!valid) {
        errorAlert.classList.add('show');
        return;
      }

      successAlert.classList.add('show');
      form.reset();
    });

    function hideAlerts() {
      successAlert.classList.remove('show');
      errorAlert.classList.remove('show');
    }

    function fieldWrap(input) {
      return input.closest('.field');
    }

    function setError(input, message) {
      var wrap = fieldWrap(input);
      wrap.classList.add('has-error');
      var errorEl = wrap.querySelector('.field-error');
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(input) {
      fieldWrap(input).classList.remove('has-error');
    }

    function validateRequired(input, message) {
      if (!input.value.trim()) {
        setError(input, message);
        return false;
      }
      clearError(input);
      return true;
    }

    function validateEmail(input) {
      var value = input.value.trim();
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        setError(input, 'Enter an email address so we can reply.');
        return false;
      }
      if (!pattern.test(value)) {
        setError(input, 'That email address doesn\u2019t look right.');
        return false;
      }
      clearError(input);
      return true;
    }
  });
})();

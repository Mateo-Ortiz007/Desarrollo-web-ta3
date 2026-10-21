const form = document.querySelector('#signup-form');
const password = document.querySelector('#password');
const toggleButton = document.querySelector('#toggle-password');
const status = document.querySelector('#status');
const rules = {
  length: (value) => value.length >= 8,
  uppercase: (value) => /[A-ZÁÉÍÓÚÜÑ]/.test(value),
  number: (value) => /\d/.test(value),
};

function updateRequirements() {
  for (const [name, isMet] of Object.entries(rules)) {
    const item = document.querySelector(`[data-rule="${name}"]`);
    const met = isMet(password.value);
    item.classList.toggle('met', met);
    item.querySelector('span').textContent = met ? '✓' : '○';
  }
}

password.addEventListener('input', () => {
  status.textContent = '';
  updateRequirements();
});

toggleButton.addEventListener('click', () => {
  const showing = password.type === 'password';
  password.type = showing ? 'text' : 'password';
  toggleButton.textContent = showing ? '🙈 Ocultar' : '👁 Mostrar';
  toggleButton.setAttribute('aria-pressed', String(showing));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateRequirements();
  const isValid = Object.values(rules).every((rule) => rule(password.value));
  status.textContent = isValid ? 'Cuenta creada' : 'Completa los 3 requisitos para continuar.';
  status.classList.toggle('error', !isValid);
});

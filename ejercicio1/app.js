const comment = document.querySelector('#comment');
const counter = document.querySelector('#counter');
const publishButton = document.querySelector('#publish');
const form = document.querySelector('#comment-form');
const status = document.querySelector('#status');
const maxLength = Number(comment.maxLength);

function updateCounter() {
  const length = comment.value.length;
  counter.textContent = `${length}/${maxLength}`;
  counter.classList.toggle('warning', length >= 250 && length < maxLength);
  counter.classList.toggle('limit', length === maxLength);
  publishButton.disabled = length === maxLength;
}

comment.addEventListener('input', updateCounter);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!comment.value.trim() || comment.value.length === maxLength) return;
  status.textContent = '¡Comentario publicado!';
  comment.value = '';
  updateCounter();
});

updateCounter();

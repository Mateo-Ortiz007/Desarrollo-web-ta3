const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskCount = document.querySelector('#task-count');

function updateListSummary() {
  const count = list.children.length;
  taskCount.textContent = `${count} ${count === 1 ? 'tarea' : 'tareas'}`;
  emptyState.hidden = count > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const item = document.createElement('li');
  item.className = 'task-item';
  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = text;

  const completeButton = document.createElement('button');
  completeButton.className = 'task-action';
  completeButton.type = 'button';
  completeButton.dataset.action = 'toggle';
  completeButton.setAttribute('aria-label', `Marcar como completada: ${text}`);
  completeButton.textContent = '✓';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'task-action';
  deleteButton.type = 'button';
  deleteButton.dataset.action = 'delete';
  deleteButton.setAttribute('aria-label', `Eliminar tarea: ${text}`);
  deleteButton.textContent = '🗑';

  item.append(taskText, completeButton, deleteButton);
  list.append(item);
  input.value = '';
  input.focus();
  updateListSummary();
});

// Un único listener en la lista gestiona los botones de todas las tareas, incluso las nuevas.
list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button || !list.contains(button)) return;

  const item = button.closest('.task-item');
  if (button.dataset.action === 'toggle') {
    item.classList.toggle('completed');
    const completed = item.classList.contains('completed');
    button.setAttribute('aria-label', `${completed ? 'Marcar como pendiente' : 'Marcar como completada'}: ${item.querySelector('.task-text').textContent}`);
  } else if (button.dataset.action === 'delete') {
    item.remove();
    updateListSummary();
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    input.value = '';
    input.focus();
  }
});

updateListSummary();

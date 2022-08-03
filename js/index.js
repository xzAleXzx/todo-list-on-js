// Создание переменной todosNode и поиск её в html
const todosNode = document.querySelector('.js-todos');

// Переменные input и button
const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');

// Создание пустого массива
let todos = [];

// Функция по добавлению новой задачи
function addTodo(text) {
  const todo = {
    text,
    done: false,
    id: `${Math.random()}`,
  };
  todos.push(todo);
}

// Функция по удалению задачи
// Для этого нужно пробежаться по массиву, найти id
function deleteTodo(id) {
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = true;
    }
  });
}

// Функция render она не принимает никаких данных, а работает только с массивом
function render() {
  console.log(todos);

  let html = '';
  let i = 1;

  todos.forEach((todo) => {
    if (todo.done) {
      return;
    }

    html += `
      <div class='line'>
        ${i++}. ${todo.text}
        <button class='bs' data-id='${todo.id}'>Сделано</button>
      </div>
    `;
  });

  todosNode.innerHTML = html;
}

// Cлушатель событий на клавишу Enter в input
inputNode.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const text = inputNode.value;
    if (text !== '') {
      addTodo(text);
      render();
      inputNode.value = '';
    }
    return;
  }
});

// получение данных из input
btnNode.addEventListener('click', () => {
  const text = inputNode.value;
  if (text !== '') {
    addTodo(text);
    render();
    inputNode.value = '';
  }
  return;
});

function sound() {
  let audio = new Audio();
  audio.src = 'audio/zvon.mp3';
  audio.autoplay = true;
}

// задача сделана
todosNode.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const id = event.target.dataset.id;
  sound();
  deleteTodo(id);

  render();
});
// вызов метода render, чтобы вывести актуальное состояние
// render();


let task = null; 

const dragStart = (event) => {
  // console.log(event.target);
  event.target.className += ' hold';
  task = event.target;
  setTimeout(() => (event.target.className = 'invisible'), 0);
};

const dragEnd = (event) => {
  // console.log(event.target);
  event.target.className = 'task fill';
};

const addTask = (taskValue) => {
  const task = document.createElement('li');
  task.classList.add('task');
  task.classList.add('fill');
  task.setAttribute('draggable', 'true');
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.innerText = taskValue;

  const removeTask = (event) => {
    const tasks = event.target.parentNode.parentNode;
    const task = event.target.parentNode;
    tasks.removeChild(task);
  };

  const trash = document.createElement('div');
  trash.classList.add('trash');
  trash.innerText = 'X';
  trash.addEventListener('click', removeTask);

  task.appendChild(taskContent);
  task.appendChild(trash);

  const tasks = document.getElementById('tasks-added');
  tasks.insertBefore(task, tasks.childNodes[0]);
};

document.getElementById('add-task').addEventListener('click', () => {
  const taskValue = document.getElementById('task-value').value;
  if (taskValue) addTask(taskValue);
  document.getElementById('task-value').value = '';
});

// DRAG & DROP

const dropzones = document.querySelectorAll('.dropzone');

const dragEnter = (event) => {
  // console.log("ENTER");
  event.preventDefault();
  if (event.target.className === 'column dropzone') {
    event.target.className += ' hovered';
  }
};

const dragOver = (event) => {
  // console.log("OVER");
  event.preventDefault();
};

const dragLeave = (event) => {
  // console.log("LEAVE");
  if (event.target.className === 'column dropzone hovered') {
    event.target.className = 'column dropzone';
  }
};

const dragDrop = (event) => {
  // console.log("DROP");
  if (event.target.className === 'column dropzone hovered') {
    event.target.className = 'column dropzone';
  }
  event.target.append(task);
};

for (const dropzone of dropzones) {
  dropzone.addEventListener('dragenter', dragEnter);
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('dragleave', dragLeave);
  dropzone.addEventListener('drop', dragDrop);
}
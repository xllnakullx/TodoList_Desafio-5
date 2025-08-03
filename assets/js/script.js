const generateId = () => {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`
}

const tasks = [
  {
    id: generateId(),
    name: 'Tarea 1',
    completed: false
  },
  {
    id: generateId(),
    name: 'Tarea 2',
    completed: true
  },
  {
    id: generateId(),
    name: 'Tarea 3',
    completed: true
  }
  ,
  {
    id: generateId(),
    name: 'Tarea 3',
    completed: false
  }
]

const inputTaskContainer = document.querySelector('#add-task-container')
const inputTask = document.querySelector('#task')
const btnAddTask = document.querySelector('#add')
const toDoList = document.querySelector('#todo-list')
const totalTasks = document.querySelector('#total')
const completedTasks = document.querySelector('#completed')

const renderToDoList = (taskList) => {
  taskList.forEach((task) => {
    const { id, name, completed } = task
    const btnBgCompleted = `${completed ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-green-500 hover:bg-green-400'}`
    const liBgCompleted = `${completed ? 'bg-green-200' : ''}`
    const btnText = `${completed ? 'Dejar pendiente' : 'Completar'}`

    const li = document.createElement('li')
    li.className = `border border-gray-300 p-2 mt-2 flex justify-between ${liBgCompleted}`
    li.innerHTML = `<span><strong>ID: ${id}</strong> - ${name}</span>
                    <div id="actions" class="flex justify-end gap-2">
                        <button class="${btnBgCompleted} text-white py-1 px-2 rounded">${btnText}</button>
                        <button class="bg-red-500 text-white py-1 px-2 hover:bg-red-400 rounded">Eliminar</button>
                    </div>`
    toDoList.appendChild(li)
  })

  totalTasks.textContent = taskList.length
  completedTasks.textContent = taskList.filter(task => task.completed).length
  inputTask.value = ''
}

const addTask = () => {
  if (inputTask.value === '') {
    const info = document.createElement('p')
    info.textContent = 'Debes ingresar una tarea'
    info.className = 'mx-auto text-red-500 mt-2 transition-all duration-500'
    inputTaskContainer.appendChild(info)
    setTimeout(() => {
      info.classList.add('opacity-0')
      setTimeout(() => {
        info.remove()
      }, 500)
    }, 500)
    return
  }

  const task = {
    id: generateId(),
    name: inputTask.value,
    completed: false
  }

  tasks.push(task)
  toDoList.innerHTML = ''
  renderToDoList(tasks)
}

const completeTask = (id) => {
  const task = tasks.find(task => task.id === id)

  task.completed = !task.completed
  toDoList.innerHTML = ''
  renderToDoList(tasks)
}

const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id)

  tasks.splice(index, 1)
  toDoList.innerHTML = ''
  renderToDoList(tasks)
}

btnAddTask.addEventListener('click', addTask)

toDoList.addEventListener('click', (e) => {
  const target = e.target
  const parent = target.parentElement.parentElement
  const id = parent.querySelector('strong').textContent.split(' ')[1]

  if (target.textContent === 'Completar' || target.textContent === 'Dejar pendiente') {
    completeTask(id)
  }

  if (target.textContent === 'Eliminar') {
    deleteTask(id)
  }

})

renderToDoList(tasks)

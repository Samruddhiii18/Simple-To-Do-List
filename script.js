document.addEventListener('DOMContentLoaded' , () =>{
    const todo_input = document.getElementById('todo-input');
    const add_task = document.getElementById('add-task-btn');
    const todo_list = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task));

    add_task.addEventListener('click' , () =>{
        const taskText = todo_input.value.trim();
        if(taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        todo_input.value = ""; //clear input
        console.log(tasks);
    });

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if(task.completed){
            li.classList.add('completed');
        }
        li.innerHTML =`
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>
        `;
        li.addEventListener('click', (e) =>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTask();
        });

        li.querySelector('button').addEventListener('click', (e) =>{
            e.stopPropagation(); //Preventtoggle from firing
            tasks = tasks.filter((t) => t.id === task.id);
            li.remove();
            saveTask();
        })
        todo_list.append(li);
        
    }

    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})
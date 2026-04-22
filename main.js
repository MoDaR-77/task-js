let task;
if (localStorage.getItem('task')) {
    task = JSON.parse(localStorage.getItem('task'));
} else {
    task = [];
}

const namei = document.querySelector(".namei");
const datei = document.querySelector(".datei");
const alzr = document.querySelector(".addd");
const tasksContainer = document.querySelector(".tasks");
const addbuButton = document.querySelector(".addbu");
const addproForm = document.querySelector(".addpro");

function task_refresh() {
    localStorage.setItem('task', JSON.stringify(task));
}

function deleteTask(index) {
    task.splice(index, 1);
    task_refresh();
    view_list();
}

function editTask(index) {
    const newName = prompt("عدّل اسم المهمة:", task[index].name);
    if (newName !== null && newName.trim() !== '') {
        task[index].name = newName;
        task_refresh();
        view_list();
    }
}

function toggleComplete(index) {
    task[index].completed = !task[index].completed;
    task_refresh();
    view_list();
}

function add_task() {
    if (namei.value.trim() === '' || datei.value === '') {
        alert('  اسم وتاريخ المهمة');
        return;
    }
    
    const newTaskObject = {
        name: namei.value,
        date: datei.value,
        completed: false
    };

    task.push(newTaskObject);
    
    task_refresh();
    view_list();
    
    namei.value = '';
    datei.value = '';
    
}

function view_list() {
    let listContent = '';
    for (let i = 0; i < task.length; i++) {
        const isCompleted = task[i].completed ? 'completed' : '';
        listContent += `
            <div class="task-item ${isCompleted}">
                <span>
                    <strong>${task[i].name}</strong> (تاريخ: ${task[i].date})
                </span>
                <div>
                    <button onclick="toggleComplete(${i})">إنجاز</button>
                    <button onclick="editTask(${i})">تعديل</button>
                    <button onclick="deleteTask(${i})">حذف</button>
                </div>
            </div>
        `;
    }
    tasksContainer.innerHTML = listContent;
}

alzr.addEventListener('click', add_task);

function tskvv() {
    
    const isVisible = getComputedStyle(addproForm).display === 'block';

    if (isVisible) {
        addproForm.style.display = 'none';
    } else {
        addproForm.style.display = 'block';
    }
}

addbuButton.addEventListener('click', tskvv);

view_list();

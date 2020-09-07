//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

console.log("hello");
// Load event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}
//get tasks from LS
function getTasks() {
    if (localStorage.getItem('tasks')=== null) {
        tasks=[]
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        //add a class
        li.className = 'collection-item';
        //create text node and appeand to li
        li.appendChild(document.createTextNode(task))
        // create new link element
        const link = document.createElement('a');
        //add a class
        link.className = 'delete-item secondary-content';
        //ad icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //apeadn the link to li
        li.appendChild(link);
        taskList.appendChild(li);
    });
}
// Add Task
function addTask(e) {
    if(taskInput.value ===''){
        alert('Add a task');
    }
    //create li element
    else {
        const li = document.createElement('li');
        //add a class
        li.className = 'collection-item';
        //create text node and appeand to li
        li.appendChild(document.createTextNode(taskInput.value))
        // create new link element
        const link = document.createElement('a');
        //add a class
        link.className = 'delete-item secondary-content';
        //ad icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //apeadn the link to li
        li.appendChild(link);
        taskList.appendChild(li);
        
        //store in LS
        storeTaskInLocalStorage(taskInput.value);
        
        
    }

    taskInput.value='';
    e.preventDefault();
}
//Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks')=== null) {
        tasks=[]
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You sure')){
            e.target.parentElement.parentElement.remove();
            //remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')=== null) {
        tasks=[]
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear tasks
function clearTasks() {
    //taskList.innerHTML='';
    // or remove-child
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
//clear from LS
    clearTasksfromLocalStorage();
}
//clear tasks from LS 
function clearTasksfromLocalStorage() {
    localStorage.clear();
}
// filter tasks
function filterTasks(e) {
    const text= e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item= task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display='block';
        }
        else {
            task.style.display='none';
        }

    });

}
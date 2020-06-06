// Define UI variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load event listeners function
function loadEventListeners(){
    //DOm load 
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear btn 
    clearBtn.addEventListener('click', clearTask);
    //Filter through lsit 
    filter.addEventListener('keyup', filterTask);


}


function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');

        // add class
        li.className = 'collection-item';
    
        //create text node and append to li 
        li.appendChild(document.createTextNode(task));
        //create new link element 
        const link = document.createElement('a');
    
        // Add class
        link.className = 'delete-item secondary-content';
    
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"><i>';
        // Append the link to li
        li.appendChild(link);
    
        // append li to ul 
    
        taskList.appendChild(li);
    })
}
// Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // Create li element 
    const li = document.createElement('li');

    // add class
    li.className = 'collection-item';

    //create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element 
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"><i>';
    // Append the link to li
    li.appendChild(link);

    // append li to ul 

    taskList.appendChild(li);

    //Local Storage 
    storeTaskInLocalStorage(taskInput.value);

    // clear input 
    taskInput.value ='';

    // console.log(li)

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks' , JSON.stringify(tasks));

}
//Remove task function 
function removeTask(e) {
    if(e.target.parentElement.classList.contains
        ('delete-item')) {
        if(confirm('Are you sure?')) {
       e.target.parentElement.parentElement.remove();

       removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove from LS

function removeTaskFromLocalStorage(taskItem){

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task , index){
        if(taskItem.textContent === task){
            tasks.splice(index , 1)
        }
    })
    localStorage.setItem('tasks' , JSON.stringify(tasks))
    //console.log(taskItem)
}

// CLear list Btn 
function clearTask(){
    //taskList.innerHTML = ''

    //Faster version 
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    clearTasksFromLocalStorage();
}

//clear LS

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1 ){
            task.style.display = 'block';
        } else{
            task.style.display = 'none'
        }
    });

    // console.log(text)

}
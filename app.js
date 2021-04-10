// Define UI Variables

const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")


//  Load all events

loadEventListeners();

// Load all event listeners

function loadEventListeners(){
    // DOM Load Event
    document.addEventListener("DOMContentLoaded",getTasks);
    //  add task
    form.addEventListener("submit" ,addTask);

    // remove task event
    taskList.addEventListener('click',removeTask);

    // clear task
    clearBtn.addEventListener('click',clearTasks);

    // filter
    filter.addEventListener('keyup',filterTasks);
}

// get task from local storage
function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
    }

    tasks.forEach(function(task){
    const li = document.createElement("li")
    li.className = 'collection-item' // adding classname as collection item because of materalize
    // create text node and append 
    li.appendChild(document.createTextNode(task));

    // now create a cross link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content"// secondary for align to right
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // now add link to li
    li.appendChild(link)

    
    // adding li to ul
    taskList.appendChild(li);
    });

}

//  Add Task
function addTask(e){
    // if we didn't put task then 
    if(taskInput.value === ""){
        alert("Add a task")
    }

    // if we create task then put inside the list
    
    else{
        const li = document.createElement("li")
    li.className = 'collection-item' // adding classname as collection item because of materalize
    // create text node and append 
    li.appendChild(document.createTextNode(taskInput.value));

    // now create a cross link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content"// secondary for align to right
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // now add link to li
    li.appendChild(link)
    console.log(li )

    // adding li to ul
    taskList.appendChild(li);

    // For local storage 
    storeTaskInLocaLStorage(taskInput.value);// it call and store the added task in local storage so that we can use it
                              // whether the page refreshes 

    // after appending we should clear the text from taskInput

    taskInput.value = "";
    }
    e.preventDefault();
}

function storeTaskInLocaLStorage(task){
    
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks ))
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are You Sure?")){
            e.target.parentElement.parentElement.remove();
        }
        // first parentElement is delete item class whose parent is li with collection-items class

        // now we wnat to remove from Local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }


    e.preventDefault();
}
// remove from local storage

function removeTaskFromLocalStorage(taskItem ){
    console.log(taskItem)
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))

    }



// clear Task
function clearTasks() {
    // taskList.innerHTML ='' slower versiom

    // faster
    while(taskList.firstChild){// runs until there is 0 child
        taskList.removeChild(taskList.firstChild)
        
    }

    clearTaskFromLocalStorage();


}

// clear from local storage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
         const item = task.firstChild.textContent;
         
         if(item.toLowerCase().indexOf(text) != -1){
             task.style.display = "block";
         }
         else{
             task.style.display = "none";
         }
    })
    
}
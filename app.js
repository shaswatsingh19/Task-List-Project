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
    //  add task
    form.addEventListener("submit" ,addTask);
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

    // after appending we should clear the text from taskInput

    taskInput.value = "";
    }
    e.preventDefault();
}
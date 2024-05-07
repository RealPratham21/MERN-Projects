const InputBar = document.querySelector('.inputBar');
const TaskList = document.querySelector('.task-list');
const addBtn = document.querySelector('.add-btn')
let ElementtobeEdited = null;
document.addEventListener("DOMContentLoaded", async (e)=>{
    const data = await (await fetch("http://localhost:5000/getData")).json();
    console.log(data);
    if (data){
        const Elements = data.map(elem => {
            let parentElement = document.createElement('div');
            parentElement.className = "tasks";
            let taskName = document.createElement("div");
            taskName.className = "task-Name";
            taskName.textContent = elem.Task;
            let DeleteOption = document.createElement("i");
            DeleteOption.className = "fa-solid fa-trash";
            let EditButton = document.createElement("i");
            EditButton.className = "fa-solid fa-pen";
            let TaskOptions = document.createElement("div");
            TaskOptions.className = "task-options";
            DeleteOption.onclick = function(){
                deleteElement(parentElement);
            }
            EditButton.onclick = function(){
                addBtn.textContent = "Edit";
                ElementtobeEdited = parentElement;
            }
            TaskOptions.appendChild(DeleteOption);
            TaskOptions.appendChild(EditButton);
            parentElement.appendChild(taskName);
            parentElement.appendChild(TaskOptions);
            TaskList.appendChild(parentElement);
        })
    }
})
function addTask(){
    if (!InputBar.value){
        window.alert("Task cannot be Empty!");
        return;
    }
    if (addBtn.textContent == "Edit"){
        const temp = ElementtobeEdited.querySelector('.task-Name').textContent;
        ElementtobeEdited.querySelector('.task-Name').textContent = InputBar.value;
        addBtn.textContent = "Add";
        fetch("http://localhost:5000/addTask", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({OldName: temp, Name: InputBar.value, Add: false})

        }).then((res)=>{
            console.log(res);
        })
        InputBar.value = "";
        ElementtobeEdited = null;
    }
    else{
        let parentElement = document.createElement('div');
        parentElement.className = "tasks";
        let taskName = document.createElement("div");
        taskName.className = "task-Name";
        taskName.textContent = InputBar.value;
        let DeleteOption = document.createElement("i");
        DeleteOption.className = "fa-solid fa-trash";
        let EditButton = document.createElement("i");
        EditButton.className = "fa-solid fa-pen";
        let TaskOptions = document.createElement("div");
        TaskOptions.className = "task-options";
        DeleteOption.onclick = function(){
            deleteElement(parentElement);
        }
        EditButton.onclick = function(){
            addBtn.textContent = "Edit";
            ElementtobeEdited = parentElement;
        }
        TaskOptions.appendChild(DeleteOption);
        TaskOptions.appendChild(EditButton);
        parentElement.appendChild(taskName);
        parentElement.appendChild(TaskOptions);
        TaskList.appendChild(parentElement);
        fetch("http://localhost:5000/addTask", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({Name: InputBar.value, Add: true})

        }).then((res)=>{
            console.log(res);
        })
        InputBar.value = "";
    }
    
}
function deleteElement(e){
    const TaskName = e.querySelector('.task-Name').textContent;
    fetch("http://localhost:5000/deleteTask", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({Name: TaskName})

    }).then((res)=>{
        console.log(res);
    })
    e.remove();
}
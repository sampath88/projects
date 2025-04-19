//selectors update
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
    document.addEventListener('DOMContentLoaded', refresh);
    todoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteCheck);
    filterOption.addEventListener('click', filterTodo);


//functions

function addTodo(event){
    //prevent from form submitting
    event.preventDefault();
    //add todo only if there is value inside it
    if(todoInput.value){
        // create Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText= todoInput.value;
    todoDiv.appendChild(newTodo);
    saveToLocal(todoInput.value);

    //create check mark button
    const completedButton =document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerText="DONE";
    todoDiv.appendChild(completedButton);

    //create trash button
    const trashButton =document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerText="DELETE";
    todoDiv.appendChild(trashButton);

    //append div to ul
    todoList.appendChild(todoDiv);

    //clear input value after adding todo
    todoInput.value ="";
    } else {
        alert("Enter TODO");
    }
    
    
}

function deleteCheck(e) {
    const item = e.target;
    
    //Delete Todo
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        //delete animation
        removeFromLocal(todo.firstChild.innerText);
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();

        } );
    }
    //copleted Todo
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        todo.firstChild.classList.toggle("mark-it"); 
        
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        console.log(todo);
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break
        }
    });
};

function saveToLocal(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos= [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function refresh(){
    markedTodo();
    function markedTodo() {
        console.log(todoList.childNodes);
        todoList.childNodes.forEach(function (todo) {
            if(todo.classList.contains('completed')){
                var marked = [];
                marked.push(todo)
                console.log(marked);
            }
        })
    
        
    }
    if(localStorage.getItem('todos')){
        let todos= JSON.parse(localStorage.getItem('todos'));
        todos.forEach(function(recovery){
            // create Todo DIV
            const todoDiv = document.createElement('div');
            todoDiv.classList.add("todo");
            //create LI
            const newTodo = document.createElement('li');
            newTodo.classList.add("todo-item");
            newTodo.innerText= recovery;
            todoDiv.appendChild(newTodo);

            //create check mark button
            const completedButton =document.createElement("button");
            completedButton.classList.add("complete-btn");
            completedButton.innerText="DONE";
            todoDiv.appendChild(completedButton);

            //create trash button
            const trashButton =document.createElement("button");
            trashButton.classList.add("trash-btn");
            trashButton.innerText="DELETE";
            todoDiv.appendChild(trashButton);

            //append div to ul
            todoList.appendChild(todoDiv);
        })
    }
}


function removeFromLocal(deleteItem){
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(function(value){
        return value !== deleteItem;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

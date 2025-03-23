const todos = [];

const renderTodos = (filter = "all") => {
    const todoListUl = document.getElementById("todo-list"); 
    todoListUl.innerHTML = ""; 

    for (const todo of todos) {
        if (filter === "done" && !todo.done) continue;
        if (filter === "todo" && todo.done) continue;

        const todoItemLi = document.createElement("li");
        todoItemLi.textContent = todo.text;

        if (!todo.done) {
            const markTodoAsDoneButton = document.createElement("button");
            markTodoAsDoneButton.textContent = "Marcar como concluído";

            markTodoAsDoneButton.onclick = () => {
                markTodoAsDone(todo.id);
                renderTodos(filter); 
            };

            todoItemLi.appendChild(markTodoAsDoneButton);
        } else {
            todoItemLi.style.textDecoration = "line-through"; 
        }

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.textContent = "Excluir";

        deleteTodoButton.onclick = () => {
            deleteTodo(todo.id);
            renderTodos(filter); 
        };

        todoItemLi.appendChild(deleteTodoButton);
        todoListUl.appendChild(todoItemLi);
    }
};

function markTodoAsDone(todoId) {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
        todo.done = true;
    }
}

document.getElementById("todo-form").addEventListener("submit", (e) => {
    e.preventDefault(); 

    const newTodoInput = document.getElementById("todo-input");
    const todoInputValue = newTodoInput.value.trim(); 

    if (todoInputValue === "") return;

    addTodo(todoInputValue); 
    newTodoInput.value = ""; 
    renderTodos("all"); 
    
    const filterSelect = document.getElementById("filter-select");
    filterSelect.value = "all"; 
});

function addTodo(todoText) {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
        id: lastId + 1,
        text: todoText,
        done: false, 
    };

    todos.push(newTodo); 
}

function deleteTodo(todoId) {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1); 
    }
}

function filterTodos(filter) {
    renderTodos(filter); 
}

renderTodos(); 

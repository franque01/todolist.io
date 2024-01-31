window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    nameInput.addEventListener('change', e => {
        localStorage.setItem('Username', e.target.value);
    })
    
    const username = localStorage.getItem('Username') || '';

    nameInput.value = username;

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
    sorting();
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        if (todo.done) {
            todoItem.classList.add('done');
        }

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        
        if(todo.category == 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input)
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done')
            }
            else{
                todoItem.classList.remove('done')
            }

            DisplayTodos()
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    });
};  

function sorting(){
    const sortBtn = document.querySelector('.sort-btn');
    const display = document.querySelector('#options');
    const sortList = document.querySelector('.sort');

    sortBtn.addEventListener('click', () => {
        display.classList.toggle('display-sort-opt');
        display.setAttribute('tabindex', '0');
        display.focus();
    }) 
    display.addEventListener('blur', () => {
        display.classList.toggle('display-sort-opt');
    }) 

    const sortItems = document.getElementsByName('sort-option');

    sortItems.forEach(sortVal => {
        sortVal.addEventListener('click' , e => {
            
            if(e.target.value == 'ascending'){
                todos.sort((a, z) => {
                    let A = a.content.toLowerCase();
                    let Z = z.content.toLowerCase();

                    if(A < Z){
                        return -1;
                    }
                    if(A > Z){
                        return 1;
                    }
                    return 0;
                });
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos(); 
            }
            if(e.target.value == 'decending'){
                todos.sort((a, z) => {
                    let A = a.content.toLowerCase();
                    let Z = z.content.toLowerCase();

                    if(A > Z){
                        return -1;
                    }
                    if(A < Z){
                        return 1;
                    }
                    return 0;
                });
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos(); 
            }
            if(e.target.value == 'createdat'){
                
                todos.sort((a, z) => {
                    let A = a.createdAt;
                    let Z = z.createdAt;

                    if(A < Z){
                        return -1;
                    }
                    if(A > Z){
                        return 1;
                    }
                    return 0;
                })
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos(); 
            }
        })
    })
    
}


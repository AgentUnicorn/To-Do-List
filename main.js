let input = document.getElementById('toDoInput');
let resultArea = document.getElementById('resultArea');
// let prior = document.getElementById('prioritu');

input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      addItem();
    }
  });

let todoList =[]

let addItem = () => {
    let todoValue = {
        text: input.value,
        isDone: false ,
        // prior: 0
    };
    todoList.push(todoValue);
    // console.log(prior);
    saveTodo();
    document.getElementById('toDoInput').value = '';
    render();
}

// let userPrior = () => {
//     prior = todoList.prior;
//     console.log("prior:", prior)
//     render(); 
// }

let removeItem = (index) => {
    todoList.splice(index, 1)
    render();
}

let toggleDone = (index) => {
    todoList[index].isDone = !(todoList[index].isDone);
    saveTodo();
    render ();
}

let saveTodo = () => {
    let str = JSON.stringify(todoList);
    localStorage.setItem("todo",str);
}

let getTodo = () => {
    let str = localStorage.getItem("todo");
    todoList = JSON.parse(str);
    console.log(todoList);
    if (!todoList) {    // check if the JSON file is empty, create new object
        todoList = [];
    } else {
        render();
    }
}

let render = (status) => {
    let showList
    let doneLen = 0;
    let undoneLen = 0;
    if(status === "done"){
        showList = todoList.filter(todo => todo.isDone)
        document.getElementById('value-done').innerHTML = `${showList.length}`;
    }else if(status === "undone"){
        showList = todoList.filter(todo => !todo.isDone)
        document.getElementById('value-undone').innerHTML = `${showList.length}`;
    } else {
        showList = todoList
        document.getElementById('value-all').innerHTML = `${showList.length}`;
    }

    let htmlTodoArray = showList.map((eachItem, index) => {
        return `<li><span style = "text-decoration: ${eachItem.isDone? `line-through`: ` `}" > 
            ${eachItem.text} </span><button class="btn btn-danger" onclick="removeItem(${index})">X</button> 
            <button class="btn btn-primary" onclick="toggleDone(${index})"> ${eachItem.isDone? `Undone`: `Done` }</button>
            </li>`
    }).join('');
    saveTodo();
    document.getElementById("resultArea").innerHTML = htmlTodoArray;
}

getTodo();

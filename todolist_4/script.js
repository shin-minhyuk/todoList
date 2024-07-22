const inpTime = document.querySelector("#time")
const inpText = document.querySelector("#text")

const fab = document.querySelector(".fab")
const popup = document.querySelector(".popup")
const closeBtn = document.querySelector(".close")
const submitBtn = document.querySelector(".submit")
const todoList = document.querySelector(".todo-list")
const changeBtn = document.querySelector(".change")
const deleteBtn = document.querySelector(".delete")
const menuDelBtn = document.querySelector(".menu-delbtn")

let todoArr = [];

fab.addEventListener("click", () => { popup.style.display = "block" })
closeBtn.addEventListener("click", () => { popup.style.display = "none" })
submitBtn.addEventListener("click", addTodo)

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".menu-btn")) {
    const menuBox = target.closest(".todo-item").querySelector(".menu-box")
    menuBox.style.display = "block"
  }

  if (target.closest(".menu-delbtn")) {
    const menuBox = target.closest(".todo-item").querySelector(".menu-box")
    menuBox.style.display = "none"
  }

  if (target.classList.contains("delete")) {
    const todoItem = target.closest(".todo-item");

    // todoItem => <li class="todo-item" data-index="0">
    deleteItem(todoItem)
  }

  if (target.classList.contains("change")) {
    const todoItem = target.closest(".todo-item");
    todoItem.querySelector(".menu-box").style.display = "none"

    // todoItem => <li class="todo-item" data-index="0">
    changeItem(todoItem)
  }
})

function gnbTime() {
  const gnbTime = document.querySelector(".gnb")
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  gnbTime.textContent = `${h}:${m}`
}
setInterval(gnbTime, 1000);
gnbTime();

function changeItem(todoItem) {
  // 1. popup display:block; 
  // 2. 객체값 기반 todoItem.time, todoItem.text 출력
  // 3. 할일 추가 버튼을 눌렀을 때 다시 그 인덱스 번호로 배열에 집어넣어야함.


  // const inpTime = document.querySelector("#time")
  // const inpText = document.querySelector("#text")
  const index = todoItem.dataset.index
  const todo = todoArr[index]
  console.log(todo)


  if (todo) {
    // console.log(todo.time)
    // console.log(inpTime.value)
    inpTime.value = todo.time
    inpText.value = todo.text
    popup.style.display = "block";

    submitBtn.removeEventListener("click", addTodo);
    submitBtn.addEventListener("click", function updateTodo() {
      if (inpTime.value && inpText.value) {
        todo.time = inpTime.value
        todo.text = inpText.value
        displayTodos(todoArr);
        popup.style.display = "none";
  
        submitBtn.removeEventListener("click", updateTodo)
        submitBtn.addEventListener("click", addTodo)
        setLocalstorage()
      } else {
        alert ("내용을 작성하세요.")
      }
    })

  }

  // todoArr.forEach((todo, todoIndex) => {
  //   if (todoIndex === Number(index)) {
  //     console.log(inpTime.value)
  //     submitBtn.addEventListener("click", () => {
  //       todoArr = todoArr.splice(todoIndex, 1)
  //       displayTodos(todoArr)
  //     })
  //   }

  //   if (inpText.value && inpTime.value) {
  //     createTodoItem()
  //     // popup.style.display = "none"
  //   } else {
  //     alert ("내용을 작성해주세요.")
  //   }
  // })
}

function deleteItem(todoItem) {
  const index = todoItem.dataset.index
  console.log(index) // 정상출력

  // 필터를 돌려서 만약 todo의 인덱스값과
  // 선택된 아이템의 인덱스 값이 같지 않은상황에는 전부 리턴
  todoArr = todoArr.filter((todo, todoIndex) => {
    // console.log(todoIndex)

    
    if (todoIndex !== Number(index)) { 
      return todo
    }
  })
  displayTodos(todoArr)
} 

function createTodoItem() {
  const todoItem = {
    id: new Date().getTime(),
    time: inpTime.value,
    text: inpText.value,
  }

  todoArr.push(todoItem)
  displayTodos(todoArr)
  setLocalstorage()
}

function displayTodos(todos) { 
  todoList.innerHTML = ""
  
  todos.forEach((todo, index) => { // 매개변수 (1.배열의 값, 2.인덱스, 3.전체배열)
    const todoLi = document.createElement("li")
    todoLi.classList.add("todo-item")
    todoLi.dataset.index = index

    todoLi.innerHTML = `
    <button class="menu-btn">
      <span class="material-symbols-outlined">menu</span>
    </button>
    <div class="menu-box">
      <div>
        <p class="change">수정하기</p>
        <p class="delete">삭제하기</p>
        <div class="menu-delbtn">
          <span class="material-symbols-outlined">close</span>
        </div>
      </div>
    </div>
    <div> 
      <span>${todo.time}</span>
      <p class="text-area">${todo.text}</p>
    </div>
    `
    todoList.append(todoLi)
  })
  setLocalstorage()
}

function addTodo() {
  if (inpText.value && inpTime.value) {
    createTodoItem() 
    popup.style.display = "none"
  } else {
    alert ("내용을 작성해주세요.")
  }
}

function setLocalstorage() {
  const stringTodoArr = JSON.stringify(todoArr)
  localStorage.setItem("todo", stringTodoArr)
}

function getLocalstorage() {
  const getLocalTodoArr = localStorage.getItem("todo")
  if (getLocalTodoArr !== null) {
    todoArr = JSON.parse(getLocalTodoArr)
    displayTodos(todoArr)
  }
}

getLocalstorage()
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
submitBtn.addEventListener("click", () => {
  if (inpText.value && inpTime.value) {
    createTodoItem()
    // popup.style.display = "none"
  } else {
    alert ("내용을 작성해주세요.")
  }
})

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
    console.log(todoItem)
    deleteItem(todoItem)
  }
})

function deleteItem() {

}

// function deleteItem(clickedId) {
//   todoArr = todoArr.filter((todo) => {
//     if (todo.id !== clickedId) {
//       return todo
//     }
//   })
//   displayTodos(todoArr)
// }

function createTodoItem() {
  const todoItem = {
    id: new Date().getTime(),
    time: inpTime.value,
    text: inpText.value,
  }

  todoArr.push(todoItem)
  displayTodos(todoArr)
  console.log(todoArr)
}

// function deleteBtn(clickedId) {
//   const id = todos.dataset.id
//   if (todoArr.forEach((todo) => {
    
//   }))
// }

function displayTodos(todos) {
  todoList.innerHTML = ""
  
  todos.forEach((todo) => {
    const todoLi = document.createElement("li")
    todoLi.classList.add("todo-item")
    todoLi.dataset.id = id

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
}
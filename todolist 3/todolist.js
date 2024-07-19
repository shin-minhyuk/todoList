// CRUD

const todoList = document.querySelector(".todo-list")
const inpText = document.querySelector(".inp-text")
const inpBtn = document.querySelector(".inp-btn")

let todoArr = [];

// 할일 생성하기
inpBtn.addEventListener("click", () => {
  const todoList = {
    id : new Date().getTime(),
    text : inpText.value,
    todoDone : false
  }

  todoArr.push(todoList)
  inpText.value = ''
  console.log(todoArr)
})

// 렌더링
function displayTodos () {
  
}
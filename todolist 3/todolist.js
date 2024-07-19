// CRUD

/**
 * 버튼을 눌렀을 때
 * <ul class="todo-list"></ul> 투두리스트에 리스트가 생성되어야함.
 * 투두리스트를 클릭했을 때, class명이 추가되어야함
 * 삭제 버튼을 누르면 삭제가 되어야 한다.
 * 로컬 스토리지 추가 및 불러오기
 */

const todoList = document.querySelector(".todo-list")
const inpText = document.querySelector(".inp-text")
const inpBtn = document.querySelector(".inp-btn")

let todoArr = [];

// 할일 생성하기
inpBtn.addEventListener("click", () => {
  if (inpText.value === "") {
    return alert("내용을 작성해주세요.")
  }

  const todoItem = {
    id : new Date().getTime(),
    text : inpText.value,
    todoDone : false
  }

  todoArr.push(todoItem)
  inpText.value = ''
  console.log(todoArr)
  displayTodos()
  setLocalStorage()
})

// 렌더링 함수만들기 실패
// 문제 : displayTodos 함수는 배열을 돌면서 각 객체의 값을 이용해서
// 생성한 돔 태그들에 값을 넣어주는 형식, 하지만? 배열을 순회하는 부분들을
// 생각하지 못했음. 그래서 문제가 생겼던 것
function displayTodos() {
  todoList.innerHTML = ""
  // li 생성
  todoArr.forEach((todo) => {
    const li = document.createElement("li")
    const span = document.createElement("span")
    const div = document.createElement("div")
    const btnDel = document.createElement("button")
    const btnCheck = document.createElement("button")

    li.classList.add("todo-list-obj")
    span.textContent = todo.text
    btnCheck.textContent = "C"
    btnDel.textContent = "X"

    li.append(span, div)
    div.append(btnCheck, btnDel)
    todoList.prepend(li)

    btnCheck.addEventListener("click", () => {
      handleCheckBtn(todo.id)
      console.log(todoArr)
    })

    btnDel.addEventListener("click", () => {
      handleDelBtn(todo.id)
    })

    if (todo.todoDone) {
      li.classList.add("done")
    } else {
      li.classList.add("yet")
    }
  })
}


// 수정
function handleCheckBtn(clickedId) {
  todoArr = todoArr.map((todo) => {
    if (todo.id === clickedId) {
      return { ...todo, todoDone: !todo.todoDone }
    }
    return todo
  })
  displayTodos()
  setLocalStorage()
}


// 삭제
function handleDelBtn(clickedId) {
  todoArr = todoArr.filter((todo) => {
    return todo.id !== clickedId
  })
  console.log(todoArr)
  displayTodos()
  setLocalStorage()
}

function setLocalStorage() {
  localStorage.setItem("투두리스트", JSON.stringify(todoArr))
}

function getLocalStorage() {
  todoArr = JSON.parse(localStorage.getItem("투두리스트"))
  displayTodos()
}

window.addEventListener("load", getLocalStorage)

const inpSelect = document.querySelector(".inp-select")

inpSelect.addEventListener("change", (event) => {
  let option = event.target.value
  if (option === '전체') {
    console.log(option)
    todoArr = todoArr.filter((todo) => {
      if (todo.todoDone === true || todo.todoDone === false) {
        return todo
      }
    })
    console.log(todoArr)
  } else if (option === '완료') {
    console.log(option)
    todoArr = todoArr.filter((todo) => {
      if (todo.todoDone === true) {
        return todo
      }
    })
  } else if (option === '미완료') {
    console.log(option)
    todoArr = todoArr.filter((todo) => {
      if (todo.todoDone === false) {
        return todo
      }
    })
  }
  displayTodos()
})
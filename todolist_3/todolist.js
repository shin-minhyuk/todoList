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

function handleAddTodo() {
  console.log('버튼눌림')
  if (inpText.value.trim() === "") {
    return alert("내용을 작성해주세요.")
    
  }

  const todoItem = {
    id : new Date().getTime(),
    text : inpText.value,
    todoDone : false
  }

  todoArr.push(todoItem)
  inpText.value = ''
  displayTodos(todoArr)
  setLocalStorage()
}

inpBtn.addEventListener("click", (e) => {
  e.preventDefault()
  handleAddTodo()
})


// 렌더링 함수만들기 실패
// 문제 : displayTodos 함수는 배열을 돌면서 각 객체의 값을 이용해서
// 생성한 돔 태그들에 값을 넣어주는 형식, 하지만? 배열을 순회하는 부분들을
// 생각하지 못했음. 그래서 문제가 생겼던 것
function displayTodos(todos) {
  todoList.innerHTML = ""

  todos.forEach((todo) => {
    const li = document.createElement("li")
    const span = document.createElement("span")
    const btndiv = document.createElement("div")
    const btnDel = document.createElement("button")
    const btnCheck = document.createElement("button")
    const listDiv = document.createElement("div")
    const timeDiv = document.createElement("div")

    li.classList.add("todo-list-obj")
    span.textContent = todo.text
    btnCheck.textContent = "C"
    btnDel.textContent = "X"
    timeDiv.textContent = elapsedText(todo.id);

    timeDiv.classList.add("time")

    listDiv.append(li, timeDiv)
    li.append(span, btndiv)
    btndiv.append(btnCheck, btnDel)
    todoList.prepend(listDiv)

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
  displayTodos(todoArr)
  setLocalStorage()
}


// 삭제
function handleDelBtn(clickedId) {
  todoArr = todoArr.filter((todo) => {
    return todo.id !== clickedId
  })
  console.log(todoArr)
  displayTodos(todoArr)
  setLocalStorage()
}

function setLocalStorage() {
  localStorage.setItem("투두리스트", JSON.stringify(todoArr))
}

function getLocalStorage() {
  let getTodos = localStorage.getItem("투두리스트")
  if(getTodos) {
    todoArr = JSON.parse(getTodos);
  } else {
    todoArr = [];
  }
  displayTodos(todoArr)
}


const inpSelect = document.querySelector(".inp-select")

function displayOption() {
  let filter = inpSelect.value
  let filteredTodos = todoArr

  if (filter === '전체') {
    filteredTodos = todoArr
  } else if (filter === '완료') {
    filteredTodos = todoArr.filter((todo) => { return todo.todoDone })
  } else if (filter === '미완료') {
    filteredTodos = todoArr.filter((todo) => { return !todo.todoDone })
  }

  displayTodos(filteredTodos)
}

inpSelect.addEventListener("change", () => {
  displayOption();
});

window.addEventListener("load", getLocalStorage)


// SNS처럼 글 작성 시간 표시 함수
function elapsedText(date) {
	// 초 (밀리초)
	const seconds = 1;
	// 분
	const minute = seconds * 60;
	// 시
	const hour = minute * 60;
	// 일
	const day = hour * 24;
	
	var today = new Date().getTime();
	var elapsedTime = Math.trunc((today - date) / 1000);
	
	var elapsedText = "";
	if (elapsedTime < seconds) {
		elapsedText = "방금 전";
	} else if (elapsedTime < minute) {
		elapsedText = elapsedTime + "초 전";
	} else if (elapsedTime < hour) {
		elapsedText = Math.trunc(elapsedTime / minute) + "분 전";
	} else if (elapsedTime < day) {
		elapsedText = Math.trunc(elapsedTime / hour) + "시간 전";
	} else if (elapsedTime < (day * 15)) {
		elapsedText = Math.trunc(elapsedTime / day) + "일 전";
	} else {
    elapsedText = date.toISOString().split('T')[0]; // 예시로 ISO 형식 날짜로 변환
	}
	
	return elapsedText;
}

setInterval(displayOption, 60000) // 1분마다 업데이트
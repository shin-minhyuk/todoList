// 요소 선택 및 배열 선언
const todoList = document.getElementById("todo-list")
const todoForm = document.getElementById("todo-form")
let todoArr = [];


// 로컬 저장소에 저장하기
function saveTodos(){
  const todoString = JSON.stringify(todoArr)
  localStorage.setItem("myTodos", todoString)
}


// 로컬 저장소에서 가져오기
function loadTodos(){
  const myTodos = localStorage.getItem("myTodos")
  if(myTodos !== null){
    todoArr = JSON.parse(myTodos)
    displayTodos()
  }
}
loadTodos()


// 할일 삭제하기
function handleTodoDelBtnClick(clickedId){
  todoArr = todoArr.filter(function(aTodo){
    return aTodo.todoId !== clickedId
  })
  displayTodos()
  saveTodos()
}


// 할일 수정하기
function handleTodoItemClick(clickedId){ // clickedId = todoId: new Date().getTime()
  todoArr = todoArr.map(function(aTodo){
    if(aTodo.todoId === clickedId){
      return {
        ...aTodo,  // 객체를 복사
        todoDone: !aTodo.todoDone  // 복사한 객체의 todoDone 값 업데이트
      }
    } else { // aTodo.todoId !== clickedId, atodo 값 그대로 반환
      return aTodo
    }
  })
  displayTodos()
  saveTodos()
}


// 할일 보여주기
function displayTodos() { // displayTodos() 함수 실행
  todoList.innerHTML = ""
  todoArr.forEach((aTodo) => { // 배열에 추가한 객체들을 하나하나씩 순회를 돌림 forEach(끝날 떄 까지) 
    const todoItem = document.createElement("li") // li 돔을 생성하는 변수
    const todoDelBtn = document.createElement("span") // span 돔을 생성하는 변수 
    todoDelBtn.textContent = "x" // span 태그로 버튼을 구현했으며, x의 값을 넣어서
    todoItem.textContent = aTodo.todoText
    todoItem.title = "클릭하면 완료됨"
    
    if (aTodo.todoDone) {
      todoItem.classList.add("done")
    } else {
      todoItem.classList.add("yet")
    }
    todoDelBtn.title = "클릭하면 삭제됨"

    todoItem.addEventListener("click", function(){
      handleTodoItemClick(aTodo.todoId); // aTodo, todoId: new Date().getTime()
    })

    todoDelBtn.addEventListener("click", function(){
      handleTodoDelBtnClick(aTodo.todoId)
    })

    todoList.appendChild(todoItem)
    todoItem.appendChild(todoDelBtn)
  })
}


// 할일 추가하기 (배열에 추가)
todoForm.addEventListener("submit",function(event){ // 전달 이벤트
  event.preventDefault(); // 전달 이벤트의 기본값 (새로고침) 제거
  const toBeAdded = { // 객체 생성
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(),
    todoDone: false // 완료된 투두리스트인가? false
  }
  todoForm.todo.value = ""; // 추가하고 todoValue값을 제거
  todoArr.push(toBeAdded) // 전체 배열에 작성한 폼의 값들을 기반으로 생성된 객체를 전달
  displayTodos() 
  saveTodos()
})
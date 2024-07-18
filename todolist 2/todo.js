const todoForm = document.querySelector(".todo-form")
const todoList = document.querySelector(".todo-list")

let todoArr = [];

// 할일 추가하기 C
todoForm.addEventListener("submit", (e) => {
  e.preventDefault()


  const toBeAdded = {
    todoText: todoForm.todo.value, // todoForm.todo(name).value => 인풋 입력값
    todoId: new Date().getTime(),  // 시간대별 특정 id값
    todoDone: false,               // 기본값 false
  }
  todoForm.todo.value = ""         // 인풋 입력값 삭제
  todoArr.push(toBeAdded)          // 배열에 작성된 객체들 추가

  localStorage.setItem("toBeAdded", JSON.stringify(todoArr)) // 로컬에 저장
  // 할일이 추가될 때 마다 할일을 보여준다.
  displayTodos()
})


// 할일 보여주기 R
function displayTodos() {
  // 배열을 순회하면서 돔요소를 생성 및 변경 후 html에 전송한다.
  // -> 버튼 클릭할 때마다 순회 -> 처음엔 1번 순회 , 두번째는 2번 순회 ...
  // 이전에 작성했던 내용들도 복사되면서 적용된다.
  // 그럼 ?
  // 순회할 때 마다 innerHTML을 초기화 후 배열을 돌린다.
  todoList.innerHTML = ''

  todoArr.forEach((list) => {
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    li.textContent = list.todoText
    li.classList.add("list-box")
    li.title = '클릭시 완료됨'
    delBtn.title = '클릭시 삭제됨'

    if(list.todoDone === true) {
      li.classList.add("done");
    } else {
      li.classList.add("yet")
    }
    delBtn.textContent = 'X'
    delBtn.classList.add("del-btn")

    li.addEventListener("click", function(){
      handleListClick(list.todoId)
    })
    delBtn.addEventListener("click", function(){
      handleDelBtnClick(list.todoId)
    })

    todoList.append(li)
    li.append(delBtn)
  })
}


// 할일 수정하기 U
function handleListClick(clickedId) { // 클릭아이디 값을 받아와서 함수 실행
  // 재할당을 꼭 해야합니다. 하지않으면 반환된 배열은 GC(가비지컬렉터)에 의해 사라집니다.
  todoArr = todoArr.map((list) => { // todolist 배열 순회하며 각각 객체(list)에 함수를 실행
    if(list.todoId === clickedId) { // 만약 todoArr 각 객체의 아이디값이랑 클릭된 아이디값이 같으면
      return { // 아래 값들을 반환한다.
        // list 객체 복사, 속성 : !(false면 true true면 false)list.todoDone 교체
        ...list, todoDone: !list.todoDone
      }
    } else { // if문에서 false값이 나오면
      return list // list 그대로 반환한다. (선택되지 않았기 때문에 속성값을 변환하지 않음)
    }
  })
  console.log(todoArr)
  displayTodos()
}
// 간단하게 설명해서 재할당을 해야 true, false 값이 변경된다.
// -> 렌더링이랑은 관계가 없다



// 할일 삭제하기 D
function handleDelBtnClick(clickedId) {
  todoArr = todoArr.filter((list) => {
    // 받아온 값과 배열을 돌았을 때 리스트의 아이디값이 다른 경우에 반환
    // -> list.todoId === clickedId 한가지 경우 빼고 전부 반환
    return list.todoId !== clickedId 
  })
  // list.todoId === clickedId 
  // 클릭된 아이디만 반환한다. -> 하나의 객체만 배열에 반환
  // 그럼 클릭한 객체 제외하고 전부 배열에서 제외되고 렌더링을 실행하니까
  // 하나밖에 안보인다.
  displayTodos()
}

function getLocalStorageId () {
  todoArr = JSON.parse(localStorage.getItem("toBeAdded"));
  displayTodos();
}
getLocalStorageId()


/**
 * 복습을 하면서 배운점
 * CRUD를 생각하면서 코드를 짜려고 노력을 했는데,
 * Delete에서 delete를 무작정 머리속에 삭제, remove, delete 단어들을 각인 시키기 보다
 * 컴퓨터의 입장에서 0,1 밖에 모르는 멍청이한테 어떤 데이터를 알려주면 이것들을 사용자들
 * 에게 보이지 않게 할 수 있을까? 라는 생각을 가지고 접근해야겠다 라고 생각을 할 수 있었습니다.
 * 지금 상황에서 클릭된 리스트의 "데이터"를 지우고, html에서 보이지 않게 하려면
 * 1. 배열에서 특정 객체를 지워야합니다. (데이터 지우기)
 * 2. 렌더링을 다시 해야합니다. (지운 후 새로운 배열을 렌더링)
 * 
 * 기존에는 crud,, delete,,, 삭제?,, innerHTML = "" 이건가... 뭐지.. 이런느낌
 * 
 * 삭제에도 과정이 필요합니다.
 * 단순 삭제 X 삭제는 어떤 과정을 통해 삭제가 될까? 고민하는 것 중요합니다.
 * 사실 공부하면서 이렇게 느끼긴 했지만, 코드를 작성하게되면 머리가 새하얘질 것 같습니다!
 */
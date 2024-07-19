/**
 * 1. 클릭시, 내용이 저장될 객체 생성
 * 2. 돔생성 및 출력
 * 3. 객체를 담을 배열 생성
 * 4. 로컬에 배열 전달
 * 5. window.load 시 화면에 렌더링
 */
let listArr = []

const addBtn = document.querySelector(".add-btn")
const addText = document.getElementById("add-text-id")
const todoList = document.querySelector(".todo-list")

// 버튼 클릭 시, 리스트 추가
addBtn.addEventListener("click", handleAddList)
// 새로고침 시 로컬에서 받아온 데이터 출력
window.addEventListener("load", init)

function listDone(clickedId){
  listArr = listArr.map((list) => {
    if(list.id === clickedId) {
      return {
        ...list, done: !list.done
      }
    } else {
      return list
    }
  })
  console.log(listArr)
}

function handleAddText(list) {  // 
  const createLi = document.createElement("li")
  const createBtn = document.createElement("button")
  // const createSpan = document.createElement("span")

  createLi.innerText = list.text
  createBtn.innerHTML = '<img src="recycle.png" alt="" />'
  createBtn.classList.add("del-btn")
  // createSpan.innerHTML = '<input type="checkbox">'

  // prepend -> 맨 앞에 추가된다. append와 같이 문자열,요소 추가가 가능하다.
  todoList.prepend(createLi)
  createLi.prepend(createBtn)
  // createLi.prepend(createSpan)
  
  // listArr.forEach(function(list){
  //   if (list.done === true) {
  //     createLi.classList.remove("list-false")
  //     createLi.classList.add("list-true")
  //   } else {
  //     createLi.classList.remove("list-true");
  //     createLi.classList.add("list-false");
  //   }
  // })

  createLi.addEventListener("click", function(){
    listDone(list.id)
  })

  // ---------------------------------------------------------

  const dataId = list.id // list[0] = {id: 1720887902933, text: "asd"}
  const delBtn = document.querySelector(".del-btn")

  delBtn.addEventListener("click", function(){

    const indexNum = listArr.findIndex((element) => {
      if(element.id === dataId) {
        return true
      }
    })
    listArr.splice(indexNum, 1)
    console.log(indexNum)

    const listArrStrings = JSON.stringify(listArr)
    localStorage.setItem("투두리스트",listArrStrings)

    location.reload();
    // const indexNum = listArr.findIndex((element) => {
    //   // return을 하지 않으면 undefined가 반환됨.
    //     return element.id === dataId
    // })
    // console.log(indexNum)

    // listArr.splice(indexNum, 1)

    // const listArrStrings = JSON.stringify(listArr)
    // localStorage.setItem("투두리스트",listArrStrings)
    // location.reload();
  })

}


// 객체 생성 및 로컬 저장
function handleAddList() {

  if (addText.value !== "" && addText.value !== null) {
    const text = addText.value.trim();

    const list = {
      id : new Date().getTime(),
      text : text,
      done : false,
    }

    handleAddText(list) // list = {id: 1720887902933, text: "ㅁㄴㅇ"}
    listArr.push(list)

    // 로컬에 전달하기위해 문자열 형태로 변경
    const listArrStrings = JSON.stringify(listArr)

    // 로컬에 추가 ("key", "value")
    localStorage.setItem("투두리스트",listArrStrings)

    // // 인풋값 초기화
    addText.value = ""
  } else {
    alert ("텍스트를 작성하세요.")
  }
}

// 렌더링, 로컬값 기반으로 화면 출력
function init () {
  const listArrParse = JSON.parse(localStorage.getItem("투두리스트"))
  
  if (listArrParse !== null && listArrParse !== "") {
    listArrParse.forEach((arr) => {
      listArr.push(arr)
      handleAddText(arr);

    })
  }
}




// delBtn.addEventListener("click", handleDelBtn)


// function handleDelBtn () {

// }


// // -------------------------------------------------------
// // CRUD create, read, update, del 생성 조회 수정 삭제
// addBtn.addEventListener("click", () => {
//   create()
//   read()
// })

// window.addEventListener("load", () => {
//   update()
// })
// // -------------------------------------------------------
// function create() {
//   const list = {
//     id : new Date().getTime(),
//     text : addText
//   }

//   const createLi = document.createElement("li")
//   createLi.innerText = addText
//   todoList.appendChild(createLi)

//   listArr.push(list)
// }
// // -------------------------------------------------------
// function read() {

//   // 리스트 배열에 객체 추가

//   // 로컬에 전달하기위해 문자열 형태로 변경
//   const listArrStrings = JSON.stringify(listArr)

//   // 로컬에 추가 ("key", "value")
//   localStorage.setItem("투두리스트",listArrStrings)
// }
// // -------------------------------------------------------
// function update() {
//   const listArrParse = JSON.parse(localStorage.getItem("투두리스트"))
    
//   if (listArrParse !== null) {
//     listArrParse.forEach((obj) => {
//       create(obj)
//     })
//   }
// }
// // -------------------------------------------------------
// function delete1() {

// }
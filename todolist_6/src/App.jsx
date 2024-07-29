import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  /**
   * 1. 수정 버튼을 클릭한 경우에만 `input`이 보이도록 코드를 작성해보세요. 
    2. 할일 완료상태를 체크할 수 있는 요소를 추가해보세요.
    3. Todo 앱의 제목을 표시하는 헤더를 추가해보세요.
    4. 작성된 Todo-App의 레이아웃을 정렬해보세요. (flex/grid 권장)
    5. 수정/추가/삭제 버튼을 디자인 해보세요.
    6. 자유롭게 적용해보고 싶은 CSS를 작성해보세요.
   */

  return (
    <>
      <div className="container">
        <header>
          <h1 className="headerTitle">Todo List</h1>
          {/* <GnbTime /> */}
        </header>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}

// function GnbTime() {
//   const now = new Date();
//   const h = String(now.getHours()).padStart(2, "0");
//   const m = String(now.getMinutes()).padStart(2, "0");

//   return (
//     <div>
//       {h}:{m}
//     </div>
//   );
// }
// setInterval(gnbTime, 1000);
// gnbTime();

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="addBtnBox">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = {
            id: Number(new Date()),
            content: inputValue,
          };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todoList">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleEditClick = () => {
    // 수정 모드 일때 버튼 클릭 시
    if (isShow === true) {
      // TodoList 배열 수정 함수 실행
      setTodoList((prev) =>
        prev.map((el) => {
          // el = 배열의 각각 객체 ( 리스트 각 요소들 )
          console.log(el);
          // 클릭한 투두의 id와 배열의 각 항목의 id를 비교했을 때, 일치하는 항목의 content를 업데이트
          return todo.id === el.id ? { ...el, content: inputValue } : el;
        })
      );
      setIsShow(false);
      //
    } else {
      setInputValue(todo.content);
      setIsShow(true);
    }
  };

  const handleDeleteClick = () => {
    setTodoList((prev) => {
      return prev.filter((el) => el.id !== todo.id);
    });
  };

  return (
    <>
      <li className="todoItemBox">
        <div className="todoItem">
          <input type="checkbox" />
          <div className="todoItemText">{todo.content}</div>
          <button className="btnEdit" onClick={handleEditClick}>
            {isShow ? "저장" : "수정"}
          </button>
          <button className="btnDelete" onClick={handleDeleteClick}>
            삭제
          </button>
        </div>
        {isShow && (
          <input
            className="inputEdit"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        )}
      </li>
    </>
  );
}

export default App;

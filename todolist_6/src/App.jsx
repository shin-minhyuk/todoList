import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  return (
    <>
      <div className="container">
        <header>
          <GnbTime />
          <h1 className="headerTitle">Todo List</h1>
        </header>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}

// function GnbTime() {
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     const setIntervalId = setInterval(() => {
//       setTime(() => {
//         const now = new Date();
//         const h = String(now.getHours()).padStart(2, "0");
//         const m = String(now.getMinutes()).padStart(2, "0");

//         return (
//           <span className="gnbTIme">
//             {h}:{m}
//           </span>
//         );
//       });
//     }, 1000);

//     return () => clearInterval(setIntervalId);
//   }, [time]);
// }

function GnbTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");

      setTime(`${h}:${m}`);
    }, 1000);

    return () => clearInterval(setIntervalId);
  }, []);

  return <span className="gnbTime">{time}</span>;
}

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

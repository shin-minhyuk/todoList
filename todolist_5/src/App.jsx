import { useState } from "react";
import "./App.css";

function App() {
  // todoList = [{}, {}] "object.object"
  const [todoList, setTodoList] = useState([
    { id: 0, content: "밥 먹기" },
    { id: 1, content: "코딩 공부하기" },
  ]);

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <br />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput(props) {
  const { todoList, setTodoList } = props;
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };

          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList(props) {
  const { todoList, setTodoList } = props;
  return (
    <>
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))}
      </ul>
    </>
  );
}

function Todo(props) {
  const { todo, setTodoList } = props;
  const [inputValue, setInputValue] = useState("");
  console.log(todo.content, inputValue);
  return (
    <li>
      {todo.content}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          // prev = todoList배열
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            console.log(prev);
            // prev === [{id:... , content:...},{},{}]
            return prev.filter((el) => {
              // el === prev[i] === {id:..., content}
              return el.id !== todo.id;
              // el.id === prev의 프로퍼티(속성) id:... 과 삭제버튼을 눌렀을 때 todo를 만들 때의 id값과 비교
            });
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;

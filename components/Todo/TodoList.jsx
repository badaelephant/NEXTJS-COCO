import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./TodoList.module.css";
const CheckboxGroup = Checkbox.Group;
const { Panel } = Collapse;
const genExtra = () => (
  <div
    onClick={(event) => {
      event.stopPropagation();
    }}
    style={{
      display: "flex",
    }}
  >
    <div className={styles.extra}>Date</div>
    <div className={styles.extra}>Complete</div>
    <div className={styles.headerbtns}>
      <EditOutlined />
      <DeleteOutlined />
    </div>
  </div>
);

function TodoList() {
  const [todoItems, setTodoItems] = useState([
    { content: "study in cafe", done: true },
    { content: "excercise", done: false },
    { content: "read books", done: false },
  ]);
  const handleCheckbox = (todo, index) => {
    const currentTodoList = todoItems;
    currentTodoList[index].done = !todo.done;
    setTodoItems([...currentTodoList]);
  };

  return (
    <Collapse defaultActiveKey={["1"]} className={styles.collapse}>
      <Panel header="This is panel header 1" key="1" extra={genExtra()}>
        <div className={styles.panel}>
          {todoItems.map((todo, index) => (
            <Checkbox
              key={index}
              className={todo.done ? styles.todoItemDone : styles.todoItem}
              checked={todo.done}
              onChange={() => handleCheckbox(todo, index)}
            >
              {todo.content}
            </Checkbox>
          ))}
        </div>
      </Panel>
    </Collapse>
  );
}

export default TodoList;

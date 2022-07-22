import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./TodoList.module.css";
const CheckboxGroup = Checkbox.Group;
const { Panel } = Collapse;


function TodoList({ todo }) {
  const [todoItems, setTodoItems] = useState(todo.todoItems);
  const countComplete = () => {
    let total = todoItems.length;
    let done = 0;
    todoItems.map((item) => {
      if (item.done) done += 1;
    });
    return `${(done / total) * 100} %`;
  };
  const genExtra = () => (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
      style={{
        display: "flex",
      }}
    >
      <div className={styles.extra}>{`Date : ${todo.date}`}</div>
      <div className={styles.extra}>{`Complete : ${countComplete()}`}</div>
      <div className={styles.headerbtns}>
        <EditOutlined />
        <DeleteOutlined />
      </div>
    </div>
  );
  const handleCheckbox = (todo, index) => {
    const currentTodoList = todoItems;
    currentTodoList[index].done = !todo.done;
    setTodoItems([...currentTodoList]);
  };

  return (
    <Collapse defaultActiveKey={["1"]} className={styles.collapse}>
      <Panel header={todo.title} key="1" extra={genExtra()}>
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

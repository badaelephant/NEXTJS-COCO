import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./TodoList.module.css";
import axios from "axios";
const { Panel } = Collapse;

function TodoList({ todo, setOpenModal, reload }) {
  const [todoItems, setTodoItems] = useState(todo.todoItems);
  const countComplete = () => {
    let total = todoItems.length;
    let done = 0;
    todoItems.map((item) => {
      if (item.done) done += 1;
    });
    return `${(done / total) * 100} %`;
  };
  const onClickEdit = () => {
    setOpenModal({ isOpened: true, todo, type: "UPDATE" });
  };
  const onClickDelete = async () => {
    console.log("todo", todo._id);
    const response = await axios.delete(`/api/todos?id=${todo._id}`);
    if (response.data.success) reload();
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
      <div className={styles.extra}>{`date : ${todo.date}`}</div>
      <div className={styles.extra}>{`complete : ${countComplete()}`}</div>
      <div className={styles.headerbtns}>
        <EditOutlined onClick={onClickEdit} />
        <DeleteOutlined onClick={onClickDelete} />
      </div>
    </div>
  );
  const handleCheckbox = async (thisTodo, index) => {
    console.log("todo==>", todo);
    const currentTodoList = todoItems;
    currentTodoList[index].done = !thisTodo.done;
    setTodoItems([...currentTodoList]);
    todo.todoItems = [...todoItems];
    await axios.patch("/api/todos", todo);
  };

  return (
    <Collapse defaultActiveKey={["1"]} className={styles.collapse} style={{ width: "90%", marginTop: "20px" }}>
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

import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./TodoMain.module.css";
import { PlusOutlined } from "@ant-design/icons";
import TodoModal from "../../components/Todo/TodoModal";
import TodoList from "../../components/Todo/TodoList";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
function TodoMain() {
  const [openModal, setOpenModal] = useState({ isOpened: false, todo: { title: "", id: "", todoItems: [] }, type: "CREATE" });
  const [todoList, setTodoList] = useState([]);
  const reload = () => {
    const result = axios
      .get("/api/todos")
      .then((result) => {
        setTodoList(result.data.data);
      })
      .catch((res) => {
        console.log("res", res);
        if (res.response.status === 401) signIn();
      });
    console.log("result==>", result);
  };
  useEffect(() => {
    reload();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.title}>TODO LIST</div>
      <div className={styles.contentLayout}>
        <TodoModal openModal={openModal} setOpenModal={setOpenModal} reload={reload} />
        <Button
          className={styles.addBtn}
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={"small"}
          onClick={() => setOpenModal({ isOpened: true, todo: { title: "", id: "", todoItems: [] }, type: "CREATE" })}
        >
          Add
        </Button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {todoList.map((todo, index) => (
            <TodoList key={index} todo={todo} setOpenModal={setOpenModal} reload={reload} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoMain;

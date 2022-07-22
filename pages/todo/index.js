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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.title}>TODO LIST</div>
      <div className={styles.contentLayout}>
        <TodoModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          // inputTitle={todo.title || ""}
          // inputItems={todo.todoItems || []}
          inputTitle={""}
          inputItems={[]}
        />
        <Button
          className={styles.addBtn}
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={"small"}
          onClick={() => setIsModalVisible(true)}
        >
          Add
        </Button>
        {todoList.map((todo, index) => (
          <TodoList todo={todo} key={index} />
        ))}
      </div>
    </div>
  );
}

export default TodoMain;

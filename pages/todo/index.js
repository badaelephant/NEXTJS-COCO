import React, { useState } from "react";
import { Button } from "antd";
import styles from "./TodoMain.module.css";
import { PlusOutlined } from "@ant-design/icons";
import TodoModal from "../../components/Todo/TodoModal";
import TodoList from "../../components/Todo/TodoList";
function TodoMain() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={styles.layout}>
      <div className={styles.title}>TODO LIST</div>
      <div className={styles.contentLayout}>
        <TodoModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
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

        <TodoList />
      </div>
    </div>
  );
}

export default TodoMain;

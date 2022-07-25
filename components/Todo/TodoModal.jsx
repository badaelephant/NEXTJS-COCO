import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function TodoModal({ openModal, setOpenModal, reload }) {
  const [title, setTitle] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    console.log("openModal", openModal);
    setTitle(openModal.todo.title);
    setTodoItems(openModal.todo.todoItems);
  }, [openModal]);
  const defaultTodo = { content: "", done: false };
  const deleteTodo = (index) => {
    const currentTodos = todoItems;
    currentTodos.splice(index, 1);
    setTodoItems([...currentTodos]);
  };
  const changeTodoInput = (e, index) => {
    const currentTodos = todoItems;
    currentTodos[index].content = e.currentTarget.value;
    setTodoItems([...currentTodos]);
  };
  const handleOk = async (values) => {
    try {
      const response =
        openModal.type === "CREATE"
          ? await axios.post("/api/todos", {
              title,
              todoItems,
            })
          : await axios.patch("/api/todos", {
              id: openModal.todo._id,
              title,
              todoItems,
            });
      if (response.data.success) reload();
    } catch (error) {}

    setOpenModal({ isOpened: false, todo: { title: "", id: "", todoItems: [] }, type: "CREATE" });
  };

  const handleCancel = () => {
    setOpenModal({ isOpened: false, todo: { title: "", id: "", todoItems: [] }, type: "CREATE" });
  };
  return (
    <Modal title="Basic Modal" visible={openModal.isOpened} onOk={handleOk} onCancel={handleCancel}>
      <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="Title">
          <Input style={{ borderRadius: "20px" }} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </Form.Item>
        {todoItems.map((todo, index) => (
          <Form.Item label={`Todo ${index}`} key={index}>
            <div style={{ display: "flex" }}>
              <Input
                style={{ borderRadius: "20px" }}
                value={todo.content}
                placeholder={"content"}
                onChange={(e) => changeTodoInput(e, index)}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  shape="round"
                  icon={<DeleteOutlined />}
                  size={"small"}
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteTodo(index)}
                >
                  DEL
                </Button>
              </div>
            </div>
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
          <Button shape="round" type="dashed" onClick={() => setTodoItems([...todoItems, defaultTodo])} block icon={<PlusOutlined />}>
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TodoModal;

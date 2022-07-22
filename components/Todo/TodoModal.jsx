import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function TodoModal({
  isModalVisible,
  setIsModalVisible,
  inputTitle,
  inputItems,
}) {
  const [title, setTitle] = useState(inputTitle);
  const [todoItems, setTodoItems] = useState(inputItems);
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
    console.log("values", values);
    const response = await axios.post("/api/todos", {
      title,
      todoItems,
    });
    console.log(response);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input
            style={{ borderRadius: "20px" }}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </Form.Item>
        {todoItems.map((todo, index) => (
          <Form.Item label={`Todo ${index}`} name="todo" key={index}>
            <div style={{ display: "flex" }}>
              <Input
                style={{ borderRadius: "20px" }}
                value={todo.content}
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
          <Button
            shape="round"
            type="dashed"
            onClick={() => setTodoItems([...todoItems, defaultTodo])}
            block
            icon={<PlusOutlined />}
          >
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TodoModal;

import React from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
function RegisterModal({ isRegisterVisible, setIsRegisterVisible }) {
  const [form] = Form.useForm();
  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    await axios.post("/api/users/signup", values);
    console.log("register complete");
    setIsRegisterVisible(false);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Register Modal"
      visible={isRegisterVisible}
      onOk={handleOk}
      onCancel={() => setIsRegisterVisible(false)}
      layout="vertical"
    >
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        style={{ width: "80%", marginLeft: "10%" }}
      >
        <Form.Item
          label="Nickname"
          name="nickName"
          rules={[
            {
              required: true,
              message: "Please input the Nickname",
            },
          ]}
        >
          <Input style={{ borderRadius: "20px" }} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input the Email",
            },
          ]}
        >
          <Input style={{ borderRadius: "20px" }} type={"email"} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input the Password",
            },
          ]}
        >
          <Input style={{ borderRadius: "20px" }} type={"password"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RegisterModal;

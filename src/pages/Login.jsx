import React,{useState, useEffect} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import client from "../client";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Login() {
    const history = useHistory()
    const {isLoggedIn} = useAuth()

    useEffect(() => {
        if(isLoggedIn){
            console.log("ok")
            history.replace("/")
        }
    }, [isLoggedIn])

  const onFinish = (values) => {
    console.log("Success:", values);
    client.post(
        "/login",
        `{
          "username":"${values.username}",
          "password":"${values.password}"
      }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(resp => {
          const jwt_token = resp.headers["authorization"].split(" ")[1]

          localStorage.setItem("jwt_token",jwt_token)
          console.log(jwt_token)
          history.replace("/")

      })
      .catch(err => console.log(err))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

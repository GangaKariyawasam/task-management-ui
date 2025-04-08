import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../../util/CommonUtil";
import httpClient, { handleResponse } from "../../util/httpClient";

import styles from "./login.module.less";
import GoogleButton from "react-google-button";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorAlert, setErrorAlert] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const setError = (error: any) => {
    setErrorAlert((prev) => [...prev, ErrorAlert(error)]);
  };

  const onSuccessCreateNewTask = (data: any) =>{
    const token = data.token;
    localStorage.setItem('token', token);
    navigate("/dashboard")
  }

  const onFinish = async (values: any) => {
    try {
      const result = await httpClient.post("/auth/login", values);
      handleResponse(result, setError, onSuccessCreateNewTask);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={styles.container}>
    {errorAlert.length > 0 && (
      <div className={styles.alertContainer}>
        {errorAlert.map((alert, idx) => (
          <div key={idx} className={styles.alert}>{alert}</div>
        ))}
      </div>
    )}

    <div className={styles.loginContainer}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        onValuesChange={() => {
          const { username, password } = form.getFieldsValue();
          setIsButtonDisabled(!(username && password)); 
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username required" }]}
          className={styles.loginInput}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password required" }]}
          className={styles.loginInput}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <span className={styles.forgotPass}>Forgot password</span>
        </Form.Item>

        <div>
          Don't have an account?{" "}
          <span
            className={styles.forgotPass}
            onClick={() => navigate("/register")}
          >
            Register now!
          </span>
        </div>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
              disabled={isButtonDisabled} 
            >
              Login
            </Button>
          )}
        </Form.Item>
        <div className={styles.socialAuth}>
          <GoogleButton  onClick={() => {
                console.log("Google login clicked");
          }}/>
        </div>
      </Form>
    </div>
  </div>
  );
};

export default Login;

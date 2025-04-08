import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { ErrorAlert, SuccessAlert } from "../../util/CommonUtil";
import httpClient, { handleResponse } from "../../util/httpClient";
import { useNavigate } from "react-router-dom";

import styles from "./register.module.less";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState<any[]>([]);

  const setError = (error: any) => {
    setErrorAlert((prev) => [...prev, ErrorAlert(error)]);
  };

  const setSuccess = () => {
    setErrorAlert((prev) => [
      ...prev,
      SuccessAlert(
        <div>
          User created successfully.{" "}
          <span className={styles.login} onClick={() => navigate("/login")}>
            Please login
          </span>
        </div>
      ),
    ]);
  };

  const onFinish = async (values: any) => {
    try {
      const result = await httpClient.post("/auth/register", values);
      handleResponse(result, setError, setSuccess);
      setTimeout(() => {
        navigate("/login");  
      }, 2000);
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

      <div className={styles.formContainer}>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item name="firstName" rules={[{ required: true, message: "First Name required" }]}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName" rules={[{ required: true, message: "Last Name required" }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: "Email required" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Password required" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;

import { Alert } from "antd";

export const ErrorAlert = (message: any) => {
    return <Alert message={message} type="error" showIcon closable />;
}

export const SuccessAlert = (message: any) => {
    return <Alert message={message} type="success" showIcon closable />;
}
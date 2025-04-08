import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import DataTable from "../../components/DataTable/DataTable";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import httpClient, { handleResponse } from "../../util/httpClient";
import { ErrorAlert } from "../../util/CommonUtil";

const statusColor: Record<string, string> = {
  "Done": "green",
  "Working on it": "orange",
  "Stuck": "red",
  "Not Started": "gray",
};

interface Task{
    id: number,
    title: string,
    description: string,
    status: string
}

const Task: React.FC = () => {
  const [loading, setLoading ] = useState(false);
  const [alertArray, setAlertArray] = useState<React.ReactNode[]>([]);
  const [dataSource, setDataSource] = useState<Task[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [form] = Form.useForm(); 
  
  const setError = (error: any) =>{
    setAlertArray((prevState) => [...prevState, ErrorAlert(error)])
    setLoading(false);
    }

  const handleAddTask = () => {
    setIsModalVisible(true);  
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);  
    form.resetFields(); 
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const response = await httpClient.post(
        "/task/create",
        values,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setIsModalVisible(false); 
      form.resetFields();
      fetchAllTask();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = async (newStatus: string, record: Task) => {
    if (newStatus === record.status) return;
  
    if (newStatus === "Done") {
      try {
        setLoading(true);
        
        await httpClient.put(`/task/update/${record.id}`, { isCompleted: true },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
        fetchAllTask();
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      setDataSource(prev => prev.map(item =>
        item.id === record.id ? { ...item, status: newStatus } : item
      ));
    }
  };
  

  const columns = [
    {
      title: 'Task',
      dataIndex: 'title',
    },
    {
        title: 'Description',
        dataIndex: 'description',
      },
    {
      title: 'Owner',
      dataIndex: 'owner',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string, record: Task, index: number) => (
        <StatusDropdown
          value={status}
          onChange={(newStatus: string) => handleChangeStatus(newStatus, record)}
        />
      ),
    },
    {
      title: 'Due date',
      dataIndex: 'dueDate',
    },
  ];

  const onSuccessFetchTask = (data: any) => {
    const parsedData = data.map((task: any) => ({
        ...task,
        status: "Not Started",
    }));
    setDataSource (parsedData);
}

  const fetchAllTask = async() =>{
    const response = await httpClient.get( "/task/getAll", 
    {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )

    handleResponse(response, setError, onSuccessFetchTask);
}

  useEffect(() => {
    fetchAllTask();
}, []);

  return (
    <div>
      <Button type="primary" onClick={handleAddTask}>
        Add New Task
      </Button>

      <DataTable columns={columns} dataSource={dataSource} pagination={false} />

      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null} 
        width={600}
        >
          <Form
           form={form}
           layout="vertical"
           onFinish={handleFormSubmit}
          >
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: "Please enter the task title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Task Description"
            rules={[{ required: true, message: "Please enter the task Description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Task;

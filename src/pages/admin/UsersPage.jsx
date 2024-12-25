import { Table, Button, Space, Input } from "antd";
import { useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const UsersPage = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "ADMIN" },
        { text: "User", value: "USER" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Mock data
  const data = [
    {
      id: 1,
      name: "erjhhY",
      email: "admin@gmail.com",
      phone: "111",
      birthday: "29/11/1993",
      role: "ADMIN",
    },
    {
      id: 43428,
      name: "erjhhY",
      email: "huy.dao@katalon.com",
      phone: "0965534254",
      birthday: "Invalid Date",
      role: "USER",
    },
    {
      id: 43429,
      name: "erjhhY",
      email: "huy.dao@gmail.com",
      phone: "0965534254",
      birthday: "2024-09-19T17:00:00.000Z",
      role: "USER",
    },
    {
      id: 43443,
      name: "erjhhY",
      email: "quynhmap123@gmail.com",
      phone: "0914449833",
      birthday: "09-09-2024",
      role: "USER",
    },
    {
      id: 43445,
      name: "erjhhY",
      email: "kelu@mailinator.com",
      phone: "0867195322",
      birthday: "23-09-2024",
      role: "USER",
    },
    {
      id: 43446,
      name: "erjhhY",
      email: "qaxo@mailinator.com",
      phone: "0937123123",
      birthday: "24-09-2024",
      role: "USER",
    },
    {
      id: 43449,
      name: "erjhhY",
      email: "chanhmankhanh@gmail.com",
      phone: "0123456789",
      birthday: "2024-09-29T17:00:00.000Z",
      role: "USER",
    },
    {
      id: 43451,
      name: "erjhhY",
      email: "dolinhphuong87@gmail.com",
      phone: "0914866689",
      birthday: "2024-10-08",
      role: "ADMIN",
    },
    {
      id: 43454,
      name: "erjhhY",
      email: "puvuxa@mailinator.com",
      phone: "0923456789",
      birthday: "2024-05-08",
      role: "ADMIN",
    },
    {
      id: 43461,
      name: "erjhhY",
      email: "adminluci@gmail.com",
      phone: "08660421111",
      birthday: "03/07/1997",
      role: "ADMIN",
    },
  ];
  console.log({ data });

  const handleEdit = (record) => {
    console.log("Edit user:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete user:", record);
  };

  return (
    <div className="rounded-lg bg-white shadow-md ~p-2/6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Space>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary">Thêm người dùng</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        // Replace with actual data from your API
        dataSource={data}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `Tổng ${total} người dùng`,
        }}
      />
    </div>
  );
};

export default UsersPage;

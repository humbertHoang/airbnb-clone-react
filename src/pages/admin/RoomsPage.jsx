import {
  DeleteOutlined,
  EditOutlined,
  PictureOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import { useState } from "react";

const RoomsPage = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Còn trống", value: "available" },
        { text: "Đã đặt", value: "booked" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "available" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<PictureOutlined />}
            onClick={() => handleManageImages(record)}
          >
            Hình ảnh
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Chỉnh sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleManageImages = (record) => {
    console.log("Manage images for room:", record);
  };

  const handleEdit = (record) => {
    console.log("Edit room:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete room:", record);
  };

  return (
    <div className="rounded-lg bg-white shadow-md ~p-2/6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Quản lý phòng</h1>
        <Space>
          <Input
            placeholder="Tìm kiếm phòng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary">Thêm phòng</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        //TODO: Replace with actual data from your API
        dataSource={[]}
        rowKey="id"
      />
    </div>
  );
};

export default RoomsPage;

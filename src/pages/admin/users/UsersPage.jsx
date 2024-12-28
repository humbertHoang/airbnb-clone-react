import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  App,
  Button,
  Input,
  Result,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/api/userApi";

const UsersPage = () => {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { message, modal } = App.useApp();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useGetUsersQuery({
    pageIndex: currentPage,
  });
  const { users = [], pagination = {} } = data || {};
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id).unwrap();
      message.success(res.message);
    } catch (error) {
      message.error("Xóa người dùng thất bại: " + error.message);
    }
  };
  const showDeleteConfirm = (record) => {
    modal.confirm({
      title: "Bạn có chắc muốn xoá user này?",
      icon: <ExclamationCircleOutlined />,
      content: `Thực hiện sẽ xoá vĩnh viễn tài khoản ${record.name}.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(record.id);
      },
    });
  };
  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };
  const handleTableChange = (pagination, filters) => {
    setCurrentPage(pagination.current);
    setRoleFilter(filters.role?.[0] || null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase()),
      render: (name) => (
        <Tooltip title={name}>
          <div className="truncate">{name}</div>
        </Tooltip>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      ellipsis: true,
      render: (email) => (
        <Tooltip title={email}>
          <div className="truncate">{email}</div>
        </Tooltip>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 120,
      render: (phone) => (
        <Tooltip title={phone}>
          <div className="truncate">{phone}</div>
        </Tooltip>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      width: 100,
      render: (birthday) => {
        try {
          return dayjs(birthday).format("DD/MM/YYYY");
        } catch {
          return "Invalid Date";
        }
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role) => (
        <Tag color={role === "ADMIN" ? "blue" : "green"}>
          {role === "ADMIN" ? "Quản trị" : "Người dùng"}
        </Tag>
      ),
      filters: [
        { text: "Quản trị", value: "ADMIN" },
        { text: "Người dùng", value: "USER" },
      ],
      filteredValue: roleFilter ? [roleFilter] : null,
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-1">
          <Tooltip title="Sửa">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id)}
              aria-label={`Edit user ${record.name}`}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record)}
              aria-label={`Delete user ${record.name}`}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isError) {
    return (
      <Result
        status="error"
        icon={<ExclamationCircleOutlined className="!text-primary" />}
        title="Không thể tải dữ liệu"
        subTitle={error?.data?.message || "Đã có lỗi xảy ra"}
        extra={[
          <Button
            key="retry"
            type="primary"
            onClick={() => refetch()}
            loading={isLoading}
          >
            Thử lại
          </Button>,
        ]}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
      <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:justify-between">
        <h1 className="whitespace-nowrap text-xl font-bold sm:text-2xl">
          Quản lý người dùng
        </h1>
        <Space className="flex-row" size="small">
          <Input
            placeholder="Tìm kiếm người dùng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full min-w-[200px]"
            aria-label="Tìm kiếm người dùng"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/admin/users/create")}
            className="w-full sm:w-auto"
          >
            <span className="!hidden sm:!inline">Thêm người dùng</span>
            <span className="sm:!hidden">Thêm</span>
          </Button>
        </Space>
      </div>
      <div className="overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={{
            indicator: <LoadingOutlined className="text-primary" spin />,
            spinning: isLoading,
          }}
          scroll={{ x: 850 }}
          onChange={handleTableChange}
          pagination={{
            current: currentPage,
            pageSize: pagination.pageSize,
            total: pagination.totalRow,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            showTotal: (total) => `Total ${total} items`,
          }}
          className="min-w-full"
          locale={{
            emptyText: "Không có dữ liệu",
          }}
          aria-label="Danh sách người dùng"
        />
      </div>
    </div>
  );
};

export default UsersPage;

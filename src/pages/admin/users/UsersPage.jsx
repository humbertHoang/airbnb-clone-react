import AdminActions from "@/components/admin/shared/AdminActions";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminPageWrapper from "@/components/admin/shared/AdminPageWrapper";
import AdminTable from "@/components/admin/shared/AdminTable";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import { App, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { useDeferredValue, useState } from "react";
import { useNavigate } from "react-router";

const UsersPage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const deferredSearchText = useDeferredValue(searchText);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { data, isLoading } = useGetUsersQuery({
    pageIndex: currentPage,
    pageSize: 10,
    keyword: deferredSearchText,
  });
  const { users = [], pagination = {} } = data || {};
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      message.success("Xóa người dùng thành công");
    } catch (error) {
      message.error("Xóa người dùng thất bại: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Tooltip title={name}>
          <div className="max-w-[150px] truncate">{name}</div>
        </Tooltip>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Tooltip title={email}>
          <div className="max-w-[200px] truncate">{email}</div>
        </Tooltip>
      ),
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
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.birthday).unix() - dayjs(b.birthday).unix(),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "ADMIN" ? "blue" : "green"}>
          {role === "ADMIN" ? "Quản trị" : "Người dùng"}
        </Tag>
      ),
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <AdminActions
          record={record}
          onEdit={handleEdit}
          onDelete={handleDelete}
          resourceName="người dùng"
          displayField="name"
        />
      ),
    },
  ];

  return (
    <AdminPageWrapper>
      <AdminPageHeader
        title="Quản lý người dùng"
        searchValue={searchText}
        onSearch={setSearchText}
        onAdd={() => navigate("/admin/users/add")}
        addText="Thêm người dùng"
        searchPlaceholder="Tìm kiếm người dùng..."
      />
      <AdminTable
        columns={columns}
        dataSource={users}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: pagination.pageSize,
          total: pagination.totalRow,
        }}
        onChange={handleTableChange}
      />
    </AdminPageWrapper>
  );
};

export default UsersPage;

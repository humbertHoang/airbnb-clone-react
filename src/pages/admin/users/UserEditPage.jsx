import { ArrowLeftOutlined } from "@ant-design/icons";
import { App, Button, Card, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserForm from "../../../components/users/UserForm";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";
const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(id, {
    skip: !id || isNaN(Number(id)),
  });
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isError) {
      message.error(
        error.data?.message ||
          error.message ||
          "Lấy thông tin người dùng thất bại",
      );
    }
  }, [error, isError, message]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await updateUser({ id, ...values }).unwrap();
      message.success("Cập nhật người dùng thành công");
      navigate("/admin/users");
    } catch (error) {
      message.error("Cập nhật người dùng thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <Result
        status="warning"
        title="Không tìm thấy người dùng"
        subTitle="Người dùng không tồn tại hoặc đã bị xóa"
        extra={[
          <Button
            key="back"
            type="primary"
            onClick={() => navigate("/admin/users")}
          >
            Quay lại danh sách
          </Button>,
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={handleCancel}
        className="hover:bg-gray-100"
      >
        Quay lại
      </Button>

      <Card
        title="Chỉnh sửa thông tin người dùng"
        className="shadow-md"
        classNames={{
          title: "text-xl font-semibold",
        }}
      >
        <UserForm
          initialValues={user}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          isCreateMode={false}
        />
      </Card>
    </div>
  );
};

export default UserEditPage;

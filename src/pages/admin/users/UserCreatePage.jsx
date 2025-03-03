import UserForm from "@/components/admin/users/UserForm";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { App, Card, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const UserCreatePage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await createUser(values).unwrap();
      message.success("Tạo người dùng thành công");
      navigate("/admin/users");
    } catch (error) {
      message.error("Tạo người dùng thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card
      title="Thêm người dùng"
      className="shadow-md"
      classNames={{
        title: "text-xl font-semibold",
      }}
    >
      <UserForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isCreateMode={true}
      />
    </Card>
  );
};

export default UserCreatePage;

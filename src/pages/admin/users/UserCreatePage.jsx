import { ArrowLeftOutlined } from "@ant-design/icons";
import { App, Button, Card, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import UserForm from "../../../components/users/UserForm";
import { useAddUserMutation } from "../../../redux/api/userApi";

const UserCreatePage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [addUser] = useAddUserMutation();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await addUser(values).unwrap();
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
    <div className="space-y-6">
      <Button icon={<ArrowLeftOutlined />} onClick={handleCancel}>
        Quay lại
      </Button>

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
    </div>
  );
};

export default UserCreatePage;

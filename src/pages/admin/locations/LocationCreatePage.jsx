import LocationForm from "@/components/admin/locations/LocationForm";
import { useCreateLocationMutation } from "@/redux/api/locationApi";
import { App, Card, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const LocationCreatePage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [createLocation] = useCreateLocationMutation();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await createLocation(values).unwrap();
      message.success("Tạo vị trí thành công");
      navigate("/admin/locations");
    } catch (error) {
      console.log(error);
      message.error("Tạo vị trí thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/locations");
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
      title="Thêm vị trí"
      className="shadow-md"
      classNames={{
        title: "text-xl font-semibold",
      }}
    >
      <LocationForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isCreateMode={true}
      />
    </Card>
  );
};

export default LocationCreatePage;

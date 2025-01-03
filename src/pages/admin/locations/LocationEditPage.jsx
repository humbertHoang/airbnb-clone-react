import LocationForm from "@/components/admin/locations/LocationForm";
import {
  useGetLocationByIdQuery,
  useUpdateLocationMutation,
} from "@/redux/api/locationApi";
import { App, Button, Card, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const LocationEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const {
    data: location,
    isLoading,
    isError,
    error,
  } = useGetLocationByIdQuery(id, {
    skip: !id || isNaN(Number(id)),
  });
  const [updateLocation] = useUpdateLocationMutation();

  useEffect(() => {
    if (isError) {
      message.error(
        error.data?.message || error.message || "Lấy thông tin vị trí thất bại",
      );
    }
  }, [error, isError, message]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await updateLocation({ id, ...values }).unwrap();
      message.success("Cập nhật vị trí thành công");
      navigate("/admin/locations");
    } catch (error) {
      message.error("Cập nhật vị trí thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/locations");
  };

  if (isLoading || loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!location) {
    return (
      <Result
        status="error"
        title="Không tìm thấy vị trí"
        subTitle="Vị trí bạn đang tìm không tồn tại hoặc đã bị xóa"
        extra={
          <Button type="primary" onClick={() => navigate("/admin/locations")}>
            Quay lại danh sách
          </Button>
        }
      />
    );
  }

  return (
    <Card
      title="Chỉnh sửa vị trí"
      className="shadow-md"
      classNames={{
        title: "text-xl font-semibold",
      }}
    >
      <LocationForm
        initialValues={location}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isCreateMode={false}
      />
    </Card>
  );
};

export default LocationEditPage;

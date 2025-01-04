import BookingForm from "@/components/admin/bookings/BookingForm";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { App, Card, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const BookingCreatePage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [createBooking] = useCreateBookingMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createBooking(values).unwrap();
      message.success("Tạo đặt phòng thành công");
      navigate("/admin/bookings");
    } catch (error) {
      message.error("Tạo đặt phòng thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    navigate("/admin/bookings");
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
      title="Thêm đặt phòng"
      className="shadow-md"
      classNames={{
        title: "text-xl font-semibold",
      }}
    >
      <BookingForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isCreateMode={true}
      />
    </Card>
  );
};

export default BookingCreatePage;

import BookingForm from "@/components/admin/bookings/BookingForm";
import {
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { App, Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const BookingEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useGetBookingByIdQuery(id);
  const [updateBooking] = useUpdateBookingMutation();
  useEffect(() => {
    if (isError) {
      message.error(
        error.data?.message ||
          error.message ||
          "Lấy thông tin đặt phòng thất bại",
      );
    }
  }, [error, isError, message]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await updateBooking({ id, ...values }).unwrap();
      message.success("Cập nhật đặt phòng thành công");
      navigate("/admin/bookings");
    } catch (error) {
      message.error("Cập nhật đặt phòng thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/bookings");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card
      title="Chỉnh sửa đặt phòng"
      className="shadow-md"
      classNames={{
        title: "text-xl font-semibold",
      }}
    >
      <BookingForm
        initialValues={booking}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        isCreateMode={false}
      />
    </Card>
  );
};

export default BookingEditPage;

import RoomForm from "@/components/admin/rooms/RoomForm";
import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
} from "@/redux/api/roomApi";
import { Card, Spin } from "antd";
import { useNavigate, useParams } from "react-router";

const RoomEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: room, isLoading: isFetching } = useGetRoomByIdQuery(id);
  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation();

  const handleSubmit = async (values) => {
    try {
      await updateRoom({ id, ...values }).unwrap();
      navigate("/admin/rooms");
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card title="Chỉnh sửa phòng">
      <RoomForm
        initialValues={room}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/rooms")}
        loading={isUpdating}
      />
    </Card>
  );
};

export default RoomEditPage;

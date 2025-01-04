import RoomForm from "@/components/admin/rooms/RoomForm";
import { useCreateRoomMutation } from "@/redux/api/roomApi";
import { Card } from "antd";
import { useNavigate } from "react-router";

const RoomCreatePage = () => {
  const navigate = useNavigate();
  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const handleSubmit = async (values) => {
    try {
      await createRoom(values).unwrap();
      navigate("/admin/rooms");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card title="Tạo phòng">
      <RoomForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/rooms")}
        loading={isLoading}
        isCreateMode
      />
    </Card>
  );
};

export default RoomCreatePage;

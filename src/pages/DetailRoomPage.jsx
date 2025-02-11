import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";
import RoomInfoComponent from "../components/RoomInfoComponent";
import { listPhongSelector } from "../redux/selectors";

const DetailRoomPage = () => {
  const roomId = useParams().roomId;
  const [detailRoom, setDetailRoom] = useState(null);
  const listRoom = useSelector(listPhongSelector);
  useEffect(() => {
    if ((listRoom.length !== 0, roomId))
      setDetailRoom(listRoom.find((room) => room.id == roomId));
  }, [roomId, listRoom]);
  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-0">
      {!detailRoom ? (
        <div className="flex h-screen items-center justify-center">
          <div className="rounded-lg p-6 text-center">
            <div className="mb-4">
              <i className="fas fa-search text-4xl text-red-600"></i>
            </div>
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              Không tìm thấy sản phẩm
            </h2>
            <p className="text-gray-500">
              Chúng tôi không thể tìm thấy phòng. Vui lòng kiểm tra lại hoặc thử
              lại sau.
            </p>
            <div className="mt-6">
              <NavLink
                to="/"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Quay về trang chủ
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <RoomInfoComponent detailRoom={detailRoom} />
      )}
    </div>
  );
};

export default DetailRoomPage;

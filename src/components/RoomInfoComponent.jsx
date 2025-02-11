import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import CardBookingComponent from "./CardBookingComponent";
import CommentList from "./CommentList";
import PostCommentBox from "./PostCommentBox";

const RoomInfoComponent = ({ detailRoom }) => {
  const user = useSelector(userSelector);
  const [listComment, setlistComment] = useState([]);
  const fetchComments = async () => {
    try {
      if (detailRoom?.id) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/binh-luan/lay-binh-luan-theo-phong/${detailRoom.id}`,
          {
            headers: {
              tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
            },
          },
        );
        setlistComment(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [detailRoom]);
  return (
    <div>
      <div className="mt-2 w-full overflow-hidden rounded-xl md:mt-4 lg:mt-6">
        <img
          className="h-auto w-full object-cover"
          src={detailRoom?.hinhAnh}
          alt={`${detailRoom?.tePhong} img`}
        />
      </div>
      <div className="mt-3 flex flex-col gap-4 md:mt-6 md:flex-row lg:mt-9">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold">{detailRoom?.tenPhong}</h2>
          <div className="flex flex-wrap items-center text-[#222]">
            <p>{detailRoom?.khach} khách</p>
            <span className="mx-1 pb-2">.</span>
            <p>{detailRoom?.phongNgu} phòng ngủ</p>
            <span className="mx-1 pb-2">.</span>
            <p>{detailRoom?.giuong} giường</p>
            <span className="mx-1 pb-2">.</span>
            <p>{detailRoom?.phongTam} phòng tắm</p>
          </div>
          <hr className="my-3" />
          <p>{detailRoom?.moTa}</p>
          <hr className="my-3" />
          <h2 className="mb-6 text-xl font-bold">Nơi này cung cấp những gì</h2>
          <div className="grid grid-cols-12 gap-3">
            {detailRoom?.wifi && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgWifi.svg" alt="Wifi Icon" />
                <p className="text-wifi">Wifi</p>
              </div>
            )}
            {detailRoom?.mayGiat && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgMayGiac.svg" alt="Washing Machine Icon" />
                <p className="text-washing-machine">Máy Giặt</p>
              </div>
            )}
            {detailRoom?.banUi && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgBanLa.svg" alt="Iron Icon" />
                <p className="text-iron">Bàn ủi</p>
              </div>
            )}
            {detailRoom?.tivi && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgtivi.svg" alt="TV Icon" />
                <p className="text-tv">Tivi</p>
              </div>
            )}
            {detailRoom?.dieuHoa && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgdieuHoa.svg" alt="Air Conditioner Icon" />
                <p className="text-air-conditioner">Điều hòa</p>
              </div>
            )}
            {detailRoom?.bep && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgbep.svg" alt="Kitchen Icon" />
                <p className="text-kitchen">Bếp</p>
              </div>
            )}
            {detailRoom?.doXe && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svgdoXe.svg" alt="Parking Icon" />
                <p className="text-parking">Đỗ xe</p>
              </div>
            )}
            {detailRoom?.hoBoi && (
              <div className="col-span-6 flex items-center gap-4">
                <img src="/icon/svghoBoi.svg" alt="Swimming Pool Icon" />
                <p className="text-swimming-pool">Hồ bơi</p>
              </div>
            )}
          </div>
          <hr className="my-3" />
          <h2 className="mb-2 text-xl font-bold">Bình luận</h2>
          <CommentList comments={listComment} />
          <PostCommentBox
            userId={user?.id}
            avatar={user?.avatar}
            roomId={detailRoom?.id}
            fetchComments={fetchComments}
          />
        </div>
        <div className="flex w-full justify-center md:w-1/2">
          <CardBookingComponent detailRoom={detailRoom} userId={user?.id} />
        </div>
      </div>
    </div>
  );
};

export default RoomInfoComponent;

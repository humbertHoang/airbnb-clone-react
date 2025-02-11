import { Rate } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { tokenSelector } from "../redux/selectors";

const PostCommentBox = ({ userId, avatar, roomId, fetchComments }) => {
  const token = useSelector(tokenSelector);
  const [rating, setRating] = useState(4);
  const [noidung, setNoidung] = useState("");
  const handleComment = async () => {
    if (!userId) {
      alert("Vui lòng đăng nhập");
    } else {
      try {
        const response = await axios({
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/api/binh-luan`,
          headers: {
            tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
            token: token,
            "Content-Type": "application/json",
          },
          data: {
            maPhong: roomId,
            maNguoiBinhLuan: userId,
            ngayBinhLuan: new Date(),
            noiDung: noidung,
            saoBinhLuan: rating,
          },
        });
        setNoidung("");
        setRating(4);
        fetchComments();
        toast.success(response.data.message);
      } catch (error) {
        console.log("🚀 ~ handleComment ~ error:", error);
      }
    }
  };
  return (
    <div className="flex w-full flex-col space-y-4 border border-gray-300 bg-gray-50 p-4 shadow-sm">
      <div className="flex w-full items-start space-x-4">
        <img
          src={
            avatar ||
            "https://www.nuockhoangtinhkhiet24h.com/upload/img/inuser/Avatar-Facebook-tr%E1%BA%AFng.jpg"
          }
          alt="User Avatar"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-grow">
          <textarea
            className="w-full resize-none rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Viết bình luận của bạn..."
            value={noidung}
            onChange={(event) => setNoidung(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Đánh giá:</span>
          <Rate onChange={(value) => setRating(value)} value={rating} />
        </div>
        <button
          className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => handleComment()}
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default PostCommentBox;

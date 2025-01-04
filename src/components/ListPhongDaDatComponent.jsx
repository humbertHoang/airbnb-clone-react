import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listPhongSelector } from "../redux/selectors";

const ListPhongDaDatComponent = ({ userId }) => {
  const listPhong = useSelector(listPhongSelector);
  const [listPhongDaDat, setListPhongDaDat] = useState([]);

  const getListPhongDaDat = async () => {
    try {
      if (userId) {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/api/dat-phong/lay-theo-nguoi-dung/${userId}`,
          headers: {
            tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        });
        setListPhongDaDat(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching booked rooms:", error);
    }
  };

  useEffect(() => {
    getListPhongDaDat();
  }, [userId]);

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      {listPhongDaDat.length > 0 ? (
        <div>
          {listPhongDaDat.map((phong) => {
            const phongInfo = listPhong.find((p) => p.id === phong.maPhong);
            return (
              <div key={phong.maPhong} className="flex items-center gap-6 p-4 border-b border-gray-200">
                <div className="w-1/4">
                <img src={phongInfo?.hinhAnh} alt="Room" className="w-full h-24 object-cover object-left-top"/></div>
                <div className="w-3/4">
                  <h2 className="font-bold text-xl">{phongInfo?.tenPhong}</h2>
                  <p className="line-clamp-2">{phongInfo?.moTa}</p>
                  <p>Ngày đi: {phong.ngayDen}</p>
                  <p>Ngày kết thúc: {phong.ngayDi}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>Không tìm thấy Phòng</h2>
      )}
    </div>
  );
};

export default ListPhongDaDatComponent;
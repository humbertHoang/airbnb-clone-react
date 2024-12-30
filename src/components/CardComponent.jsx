import React from "react";
import { useNavigate } from "react-router";

const CardComponent = ({phong,roomId}) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`room/${roomId}`)
  }
  return (
    <div className="flex flex-col gap-[5px] relative cursor-pointer" onClick={()=>handleNavigate()}>
      <img src={phong.hinhAnh} alt="" className="w-full h-64 md:h-80 lg:h-72 rounded-lg object-cover mb-3" />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold truncate w-3/4">{phong.tenPhong}</h2>
        <div className="flex w-12 gap-1 items-center">
          <i className="fa-solid fa-star" />
          <p>4.5</p>
        </div>
      </div>
      <p className="line-clamp-2 text-[#6A6A6A]">{phong.moTa}</p>
      <div className="absolute top-2 right-2 hover:scale-125 cursor-pointer">
        <img src="/icon/heart.svg" alt="" />
      </div>
      <p>{(phong.giaTien * 24000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} / đêm</p>
    </div>
  );
};

export default CardComponent;

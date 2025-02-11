import { useNavigate } from "react-router";

const CardComponent = ({ phong, roomId }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`room/${roomId}`);
  };
  return (
    <div
      className="relative flex cursor-pointer flex-col gap-[5px]"
      onClick={() => handleNavigate()}
    >
      <img
        src={phong.hinhAnh}
        alt=""
        className="mb-3 h-64 w-full rounded-lg object-cover md:h-80 lg:h-72"
      />
      <div className="flex items-center justify-between">
        <h2 className="w-3/4 truncate font-semibold">{phong.tenPhong}</h2>
        <div className="flex w-12 items-center gap-1">
          <i className="fa-solid fa-star" />
          <p>4.5</p>
        </div>
      </div>
      <p className="line-clamp-2 text-[#6A6A6A]">{phong.moTa}</p>
      <div className="absolute right-2 top-2 cursor-pointer hover:scale-125">
        <img src="/icon/heart.svg" alt="" />
      </div>
      <p>
        {(phong.giaTien * 24000).toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}{" "}
        / đêm
      </p>
    </div>
  );
};

export default CardComponent;

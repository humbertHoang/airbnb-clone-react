import React, { useState } from "react";
import TienNghiFilterComponent from "./TienNghiFilterComponent";
import RoomAndBedFilterComponent from "./RoomAndBedFilterComponent";
import { useDispatch } from "react-redux";
import { changeGiaPhong, changeTienNghi, changRoomAndBed, resetFilter } from "../redux/slice/filterSlice";
import PriceRangeComponent from "./PriceRangeComponent";
import { toast } from "react-toastify";

const FilterComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listTienNghi, setListTienNghi] = useState([
    { name: "Wifi", icon: "./icon/svgWifi.svg", select: false, code: "wifi" },
    { name: "Máy Giặt", icon: "/icon/svgMayGiac.svg", select: false, code: "mayGiat" },
    { name: "Bàn Ủi", icon: "/icon/svgBanLa.svg", select: false, code: "banLa" },
    { name: "Tivi", icon: "/icon/svgtivi.svg", select: false, code: "tivi" },
    { name: "Điều hòa", icon: "/icon/svgdieuHoa.svg", select: false, code: "dieuHoa" },
    { name: "Bếp", icon: "/icon/svgbep.svg", select: false, code: "bep" },
    { name: "Đỗ xe", icon: "/icon/svgdoXe.svg", select: false, code: "doXe" },
    { name: "Hồ bơi", icon: "/icon/svghoBoi.svg", select: false, code: "hoBoi" },
  ]);
  const [listRoomAndBed, setListRoomAndBed] = useState([
    { name: "Phòng Ngủ", code: "phongNgu", soLuong: 1 },
    { name: "Giường", code: "giuong", soLuong: 1 },
    { name: "Phòng Tắm", code: "phongTam", soLuong: 1 },
  ]);
  const [giaPhong, setGiaPhong] = useState({ tu: undefined, den: undefined });
  const dispatch = useDispatch();
  const handleSubmitFilter = () => {
    
    if (giaPhong.tu) {
      if (giaPhong.den) {
        if (giaPhong.tu > giaPhong.den) {
          toast.error("khoảng giá phòng không hợp lệ");
          return;
        }
        dispatch(changeGiaPhong(giaPhong));
      }
      dispatch(changeGiaPhong(giaPhong));
    }
    if (giaPhong.den) {
      if (giaPhong.tu > giaPhong.den) {
        toast.error("khoảng giá phòng không hợp lệ");
        return;
      }
      dispatch(changeGiaPhong(giaPhong));
    }
    dispatch(changeGiaPhong(giaPhong));
    dispatch(changeTienNghi(listTienNghi));
    dispatch(changRoomAndBed(listRoomAndBed));
    setIsOpen(false);
  };
  const handleResetFilter = () => {
    setListTienNghi([
      { name: "Wifi", icon: "./icon/svgWifi.svg", select: false, code: "wifi" },
      { name: "Máy Giặt", icon: "/icon/svgMayGiac.svg", select: false, code: "mayGiat" },
      { name: "Bàn Ủi", icon: "/icon/svgBanLa.svg", select: false, code: "banLa" },
      { name: "Tivi", icon: "/icon/svgtivi.svg", select: false, code: "tivi" },
      { name: "Điều hòa", icon: "/icon/svgdieuHoa.svg", select: false, code: "dieuHoa" },
      { name: "Bếp", icon: "/icon/svgbep.svg", select: false, code: "bep" },
      { name: "Đỗ xe", icon: "/icon/svgdoXe.svg", select: false, code: "doXe" },
      { name: "Hồ bơi", icon: "/icon/svghoBoi.svg", select: false, code: "hoBoi" },
    ]);

    setListRoomAndBed([
      { name: "Phòng Ngủ", code: "phongNgu", soLuong: 1 },
      { name: "Giường", code: "giuong", soLuong: 1 },
      { name: "Phòng Tắm", code: "phongTam", soLuong: 1 },
    ]);
    setGiaPhong({ tu: undefined, den: undefined });
  };
  isOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
  return (
    <>
      <div className="max-w-[90px] border border-[#DDDDDD] rounded-md flex items-center justify-between px-4 py-[7px] hover:border-black cursor-pointer transition-all hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
        <img src="/icon/svgFilter.svg" alt="" />
        <p className="text-sm font-medium">Lọc</p>
      </div>
      <div className={`${isOpen ? "fixed" : "hidden"} p-10 w-full h-full top-0 left-0 z-10 bg-black/30 transition-all ease-in-out duration-300`}>
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-full md:w-[568px] bg-white rounded-md shadow-lg overflow-hidden">
      {/* header */}
      <div className="flex justify-center items-center px-6 relative border-b border-[#dddddd] h-16 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800">Lọc Phòng</h2>
        <i className="absolute left-6 text-xl hover:text-2xl cursor-pointer transition-all text-gray-600 hover:text-gray-800 fa-solid fa-xmark" onClick={() => setIsOpen(!isOpen)} />
      </div>
      {/* body */}
      <div className="max-h-96 md:max-h-[450px] lg:max-h-[566px] md:h-full overflow-y-auto px-6 py-4">
        <PriceRangeComponent giaPhong={giaPhong} setGiaPhong={setGiaPhong} />
        <RoomAndBedFilterComponent listRoomAndBed={listRoomAndBed} setListRoomAndBed={setListRoomAndBed} />
        <TienNghiFilterComponent listTienNghi={listTienNghi} setListTienNghi={setListTienNghi} />
      </div>
      {/* footer */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-[#dddddd] bg-gray-50">
        <div className="p-[10px] rounded-md hover:bg-[#f5f5f5] cursor-pointer text-sm font-medium text-gray-600" onClick={() => handleResetFilter()}>
          Xóa bộ lọc
        </div>
        <button className="px-6 py-[14px] bg-[#222222] text-white font-semibold rounded-md hover:bg-black transition-colors duration-200" onClick={() => handleSubmitFilter()}>
          Hiển Thị
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default FilterComponent;

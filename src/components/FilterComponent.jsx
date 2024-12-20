import React, { useState } from 'react';
import TienNghiFilterComponent from './TienNghiFilterComponent';
import RoomAndBedFilterComponent from './RoomAndBedFilterComponent';
import { useDispatch } from 'react-redux';
import {
  changeGiaPhong,
  changeSearchBar,
  changeTienNghi,
  changRoomAndBed,
  resetFilter,
} from '../redux/slice/filterSlice';
import PriceRangeComponent from './PriceRangeComponent';
import { toast } from 'react-toastify';

const FilterComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listTienNghi, setListTienNghi] = useState([
    { name: 'Wifi', icon: './icon/svgWifi.svg', select: false, code: 'wifi' },
    {
      name: 'Máy Giặt',
      icon: '/icon/svgMayGiac.svg',
      select: false,
      code: 'mayGiat',
    },
    {
      name: 'Bàn Ủi',
      icon: '/icon/svgBanLa.svg',
      select: false,
      code: 'banLa',
    },
    { name: 'Tivi', icon: '/icon/svgtivi.svg', select: false, code: 'tivi' },
    {
      name: 'Điều hòa',
      icon: '/icon/svgdieuHoa.svg',
      select: false,
      code: 'dieuHoa',
    },
    { name: 'Bếp', icon: '/icon/svgbep.svg', select: false, code: 'bep' },
    { name: 'Đỗ xe', icon: '/icon/svgdoXe.svg', select: false, code: 'doXe' },
    {
      name: 'Hồ bơi',
      icon: '/icon/svghoBoi.svg',
      select: false,
      code: 'hoBoi',
    },
  ]);
  const [listRoomAndBed, setListRoomAndBed] = useState([
    { name: 'Phòng Ngủ', code: 'phongNgu', soLuong: 1 },
    { name: 'Giường', code: 'giuong', soLuong: 1 },
    { name: 'Phòng Tắm', code: 'phongTam', soLuong: 1 },
  ]);
  const [giaPhong, setGiaPhong] = useState({ tu: undefined, den: undefined });
  const dispatch = useDispatch();
  const handleSubmitFilter = () => {
    if (giaPhong.tu) {
      if (giaPhong.den) {
        if (giaPhong.tu > giaPhong.den) {
          toast.error('khoảng giá phòng không hợp lệ');
          return;
        }
        dispatch(changeGiaPhong(giaPhong));
      }
      dispatch(changeGiaPhong(giaPhong));
    }
    if (giaPhong.den) {
      if (giaPhong.tu > giaPhong.den) {
        toast.error('khoảng giá phòng không hợp lệ');
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
      { name: 'Wifi', icon: './icon/svgWifi.svg', select: false, code: 'wifi' },
      {
        name: 'Máy Giặt',
        icon: '/icon/svgMayGiac.svg',
        select: false,
        code: 'mayGiat',
      },
      {
        name: 'Bàn Ủi',
        icon: '/icon/svgBanLa.svg',
        select: false,
        code: 'banLa',
      },
      { name: 'Tivi', icon: '/icon/svgtivi.svg', select: false, code: 'tivi' },
      {
        name: 'Điều hòa',
        icon: '/icon/svgdieuHoa.svg',
        select: false,
        code: 'dieuHoa',
      },
      { name: 'Bếp', icon: '/icon/svgbep.svg', select: false, code: 'bep' },
      { name: 'Đỗ xe', icon: '/icon/svgdoXe.svg', select: false, code: 'doXe' },
      {
        name: 'Hồ bơi',
        icon: '/icon/svghoBoi.svg',
        select: false,
        code: 'hoBoi',
      },
    ]);

    setListRoomAndBed([
      { name: 'Phòng Ngủ', code: 'phongNgu', soLuong: 1 },
      { name: 'Giường', code: 'giuong', soLuong: 1 },
      { name: 'Phòng Tắm', code: 'phongTam', soLuong: 1 },
    ]);
    setGiaPhong({ tu: undefined, den: undefined });
  };
  isOpen
    ? document.body.classList.add('overflow-hidden')
    : document.body.classList.remove('overflow-hidden');
  return (
    <div className='flex items-center gap-2 mt-2 md:mt-0'>
      <div className="flex h-9 items-center w-full rounded-md border border-[#DDD] px-2">
        <i className="fa-solid fa-search mr-2 text-gray-500"></i>
        <input
          type="text"
          className="w-full text-sm text-gray-700 outline-none focus:border-none"
          placeholder="Tìm kiếm..."
          onChange={(e) => {
            dispatch(changeSearchBar(e.target.value));
          }}
        />
      </div>

      <div
        className="flex max-w-[90px] cursor-pointer items-center justify-between rounded-md border border-[#DDDDDD] px-4 py-[7px] transition-all hover:border-black hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/icon/svgFilter.svg" alt="" />
        <p className="text-sm font-medium">Lọc</p>
      </div>
      <div
        className={`${isOpen ? 'fixed' : 'hidden'} left-0 top-0 z-10 h-full w-full bg-black/30 p-10 transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full overflow-hidden rounded-md bg-white shadow-lg md:w-[568px]">
            {/* header */}
            <div className="relative flex h-16 items-center justify-center border-b border-[#dddddd] bg-white px-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Lọc Phòng
              </h2>
              <i
                className="fa-solid fa-xmark absolute left-6 cursor-pointer text-xl text-gray-600 transition-all hover:text-2xl hover:text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            {/* body */}
            <div className="max-h-96 overflow-y-auto px-6 py-4 md:h-full md:max-h-[450px] lg:max-h-[566px]">
              <PriceRangeComponent
                giaPhong={giaPhong}
                setGiaPhong={setGiaPhong}
              />
              <RoomAndBedFilterComponent
                listRoomAndBed={listRoomAndBed}
                setListRoomAndBed={setListRoomAndBed}
              />
              <TienNghiFilterComponent
                listTienNghi={listTienNghi}
                setListTienNghi={setListTienNghi}
              />
            </div>
            {/* footer */}
            <div className="flex items-center justify-between border-t border-[#dddddd] bg-gray-50 px-6 py-4">
              <div
                className="cursor-pointer rounded-md p-[10px] text-sm font-medium text-gray-600 hover:bg-[#f5f5f5]"
                onClick={() => handleResetFilter()}
              >
                Xóa bộ lọc
              </div>
              <button
                className="rounded-md bg-[#222222] px-6 py-[14px] font-semibold text-white transition-colors duration-200 hover:bg-black"
                onClick={() => handleSubmitFilter()}
              >
                Hiển Thị
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isErrorPhongSelector,
  isErrorViTriSelector,
  isLoadingPhongSelector,
  isLoadingViTriSelector,
} from './../redux/selectors';
import ListViTriGanDayComponent from './../components/ListViTriGanDayComponent';
import ListRoomComponent from './../components/ListRoomComponent';
import { fetchListViTri } from './../redux/slice/viTriSlice';
import { fetchListPhong } from './../redux/slice/phongSlice';
import BannerComponent from '../components/BannerComponent';

const HomePage = () => {
  const dispatch = useDispatch();
  const isLoadingPhong = useSelector(isLoadingPhongSelector);
  const isErrorPhong = useSelector(isErrorPhongSelector);
  const isLoadingViTri = useSelector(isLoadingViTriSelector);
  const isErrorViTri = useSelector(isErrorViTriSelector);

  // Initialize $dom with useRef

  useEffect(() => {
    dispatch(fetchListPhong());
    dispatch(fetchListViTri());
  }, [dispatch]);

  if (isLoadingPhong && isLoadingViTri)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-gray-500 border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-gray-500">
          Đang tải dữ liệu...
        </p>
      </div>
    );

  if (isErrorPhong || isErrorViTri)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="mb-4 text-4xl text-red-500">⚠️</div>
        <p className="text-lg font-medium text-gray-700">
          Đã xảy ra lỗi khi tải dữ liệu!
        </p>
        <button
          className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          onClick={() => dispatch(fetchListPhong())}
        >
          Thử lại
        </button>
      </div>
    );
  return (
    <div className="mb-8 md:mb-12">
      <BannerComponent />
      <ListViTriGanDayComponent />
      <ListRoomComponent />
    </div>
  );
};

export default HomePage;

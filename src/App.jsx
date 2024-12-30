import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ClientTemplate from './pages/templates/ClientTemplate';
import { ToastContainer } from 'react-toastify';
import Page404 from './pages/Page404';
import DetailRoomPage from './pages/DetailRoomPage';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/Singupcomponent';
import {
  isErrorPhongSelector,
  isErrorViTriSelector,
  isLoadingPhongSelector,
  isLoadingViTriSelector,
  userSelector,
} from './redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchListPhong } from './redux/slice/phongSlice';
import { fetchListViTri } from './redux/slice/viTriSlice';

const App = () => {
  const dispatch = useDispatch();
  const isLoadingPhong = useSelector(isLoadingPhongSelector);
  const isErrorPhong = useSelector(isErrorPhongSelector);
  const isLoadingViTri = useSelector(isLoadingViTriSelector);
  const isErrorViTri = useSelector(isErrorViTriSelector);
  // Initialize $dom with useRef

  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([
        dispatch(fetchListPhong()),
        dispatch(fetchListViTri()),
      ]);
    };
    fetchInitialData();
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientTemplate />}>
          <Route path="" element={<HomePage />} />
          <Route path="room/:roomId" element={<DetailRoomPage />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<SignUpComponent />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} />
    </BrowserRouter>
  );
};

export default App;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchListPhong } from './redux/slice/phongSlice';
import FilterComponent from './components/FilterComponent';
import ListRoomComponent from './components/ListRoomComponent';
import { ToastContainer } from "react-toastify";
import FooterComponent from "./components/FooterComponent";
import { fetchListViTri } from "./redux/slice/viTriSlice";
import { isErrorPhongSelector, isErrorViTriSelector, isLoadingPhongSelector, isLoadingViTriSelector } from "./redux/selectors";

const App = () => {
  const dispatch = useDispatch();
  const isLoadingPhong = useSelector(isLoadingPhongSelector);
  const isErrorPhong = useSelector(isErrorPhongSelector);
  const isLoadingViTri = useSelector(isLoadingViTriSelector);
  const isErrorViTri = useSelector(isErrorViTriSelector);


  useEffect(() => {
    dispatch(fetchListPhong()),
    dispatch(fetchListViTri());
  }, [dispatch]);
  if (isLoadingPhong && isLoadingViTri) return (<div className="flex flex-col items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-gray-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium text-gray-500">Đang tải dữ liệu...</p>
  </div>);
  if (isErrorPhong || isErrorViTri) return (<div className="flex flex-col items-center justify-center h-screen">
    <div className="text-red-500 text-4xl mb-4">⚠️</div>
    <p className="text-lg font-medium text-gray-700">Đã xảy ra lỗi khi tải dữ liệu!</p>
    <button
      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      onClick={() => dispatch(fetchListPhong())}
    >
      Thử lại
    </button>
  </div>);

  return (
    <div>
      <FilterComponent />
      <ListRoomComponent />
      <FooterComponent/>
      <ToastContainer />
    </div>
  );
};

export default App;

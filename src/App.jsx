import { useDispatch, useSelector } from "react-redux";
import { isErrorSelector, isLoadingSelector } from './redux/selectors';
import { useEffect } from "react";
import { fetchListPhong } from './redux/slice/phongSlice';
import FilterComponent from './components/FilterComponent';
import ListRoomComponent from './components/ListRoomComponent';
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);

  useEffect(() => {
    dispatch(fetchListPhong());
  }, [dispatch]);
  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Đã xảy ra lỗi khi tải dữ liệu!</p>;

  return (
    <div className="container mx-auto">
      <FilterComponent />
      <ListRoomComponent />
      <ToastContainer />
    </div>
  );
};

export default App;

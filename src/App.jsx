import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/Singupcomponent';
import DashboardPage from './pages/admin/DashboardPage';
import DetailRoomPage from './pages/DetailRoomPage';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import AdminTemplate from './pages/templates/AdminTemplate';
import ClientTemplate from './pages/templates/ClientTemplate';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientTemplate />}>
          <Route path="" element={<HomePage />} />
          <Route path="room/:id" element={<DetailRoomPage />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<SignUpComponent />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="rooms" element={<div>Rooms Management</div>} />
          <Route path="users" element={<div>Users Management</div>} />
          <Route path="bookings" element={<div>Bookings Management</div>} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer autoClose={1000} />
    </BrowserRouter>
  );
};

export default App;

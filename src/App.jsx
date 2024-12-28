import { App as AntApp, ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/Singupcomponent";
import BookingsPage from "./pages/admin/BookingsPage";
import DashboardPage from "./pages/admin/DashboardPage";
import LocationsPage from "./pages/admin/LocationsPage";
import RoomsPage from "./pages/admin/RoomsPage";
import UserCreatePage from "./pages/admin/users/UserCreatePage";
import UserEditPage from "./pages/admin/users/UserEditPage";
import UsersPage from "./pages/admin/users/UsersPage";
import DetailRoomPage from "./pages/DetailRoomPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import AdminTemplate from "./pages/templates/AdminTemplate";
import ClientTemplate from "./pages/templates/ClientTemplate";
import { theme } from "./theme/antd.config";

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <AntApp>
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
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="rooms" element={<RoomsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/create" element={<UserCreatePage />} />
              <Route path="users/edit/:id" element={<UserEditPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="locations" element={<LocationsPage />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<Page404 />} />
          </Routes>
          <ToastContainer autoClose={1000} />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;

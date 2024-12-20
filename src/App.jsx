import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ClientTemplate from "./pages/templates/ClientTemplate";
import { ToastContainer } from "react-toastify";
import Page404 from "./pages/Page404";
import DetailRoomPage from "./pages/DetailRoomPage";




const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientTemplate />}>
          <Route path="" element={<HomePage />} />
          <Route path="room/:id" element={<DetailRoomPage />} />
          <Route path="*" element={<Page404 />} />
          
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ClientTemplate from "./pages/templates/ClientTemplate";
import { ToastContainer } from "react-toastify";




const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientTemplate />}>
          <Route path="" element={<HomePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

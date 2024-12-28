import { Outlet } from "react-router";
import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from "../../components/NavBarComponent";

const ClientTemplate = () => {
  return (
    <>
      <NavBarComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default ClientTemplate;

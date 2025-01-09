import ListRoomComponent from "@/components/ListRoomComponent";
import ListViTriGanDayComponent from "@/components/ListViTriGanDayComponent";
import MapDisplay from "@/components/map/MapDisplay";
import { FloatButton } from "antd";
import { useEffect, useState } from "react";
import BannerComponent from "../components/BannerComponent";
import FilterComponent from "../components/FilterComponent";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [showFloatButton, setShowFloatButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setShowFloatButton(scrollPosition < viewportHeight * 2.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!open ? (
        <div className="mb-8 md:mb-12">
          <BannerComponent />
          <ListViTriGanDayComponent />
          <ListRoomComponent />
        </div>
      ) : (
        <MapDisplay />
      )}
      {showFloatButton && (
        <FloatButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              style={{ display: "block" }}
              fill="currentColor"
            >
              <path d="M565.6 36.2C572.1 40.7 576 48.1 576 56l0 336c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456L0 120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5l0 284.6 120-45.7 0-284.6L48 136.5zM360 422.7l0-285.4-144-48 0 285.4 144 48zm48-1.5l120-45.7 0-284.6L408 136.5l0 284.6z" />
            </svg>
          }
          shape="square"
          description={open ? "Danh sách" : "Bản đồ"}
          onClick={() => setOpen(!open)}
          className="end-1/2 w-28 translate-x-1/2 transition-all hover:scale-110 [&_.ant-float-btn-body]:!bg-black/85 [&_.ant-float-btn-content]:!flex-row-reverse [&_.ant-float-btn-content]:!gap-2 [&_.ant-float-btn-description]:!text-sm [&_.ant-float-btn-description]:!text-white [&_svg]:!text-white"
        />
      )}
    </>
  );
};

export default HomePage;

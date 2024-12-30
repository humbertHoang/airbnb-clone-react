import {
  ArrowLeftOutlined,
  BookOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Logo from "../common/Logo";
import LogoFull from "../common/LogoFull";

const { Sider } = Layout;

const AdminSider = ({
  collapsed,
  setCollapsed,
  drawerVisible,
  setDrawerVisible,
}) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState(false);
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setIsManuallyCollapsed(!collapsed);
  };
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Trang chủ</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Người dùng</Link>,
    },
    {
      key: "/admin/locations",
      icon: <EnvironmentOutlined />,
      label: <Link to="/admin/locations">Vị trí</Link>,
    },
    {
      key: "/admin/rooms",
      icon: <HomeOutlined />,
      label: <Link to="/admin/rooms">Phòng</Link>,
    },
    {
      key: "/admin/bookings",
      icon: <BookOutlined />,
      label: <Link to="/admin/bookings">Đặt phòng</Link>,
    },
  ];
  const renderMenu = () => {
    return (
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    );
  };

  if (isMobile) {
    return (
      <Drawer
        title={
          <div className="flex items-center justify-center text-primary">
            <LogoFull width={102} height={32} />
          </div>
        }
        placement="left"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={200}
        classNames={{ body: "!p-0" }}
      >
        {renderMenu()}
      </Drawer>
    );
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="relative bg-white shadow-sm"
      onBreakpoint={(broken) => {
        if (!isManuallyCollapsed) {
          setCollapsed(broken);
        }
      }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-100">
        <Link
          to="/admin"
          className="inline-flex flex-1 items-center justify-center text-primary transition duration-200 hover:text-primary/50"
        >
          <div className={`${collapsed ? "hidden" : "block"}`}>
            <LogoFull width={102} height={32} />
          </div>
          <div className={`${collapsed ? "block" : "hidden"}`}>
            <Logo width={30} height={32} />
          </div>
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-none text-base [&_.ant-menu-item]:!my-1 [&_.ant-menu-item]:!h-14 [&_.ant-menu-item]:!items-center [&_.ant-menu-item]:!leading-[56px]"
      />
      {isMobile ? null : (
        <>
          <Button
            type="text"
            size="small"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={handleToggleCollapse}
            className={`absolute -right-3 top-6 !h-6 !w-6 border border-gray-50 !bg-white !p-0 text-gray-400 hover:!text-primary hover:shadow-md`}
          />
          <div className={`absolute bottom-0 w-full border-t border-gray-100`}>
            <Link
              to="/"
              className="flex h-12 items-center justify-center gap-2.5 px-6 text-inherit transition-colors hover:text-primary"
            >
              <ArrowLeftOutlined />
              <span
                className={`whitespace-nowrap text-sm ${collapsed ? "hidden" : ""}`}
              >
                Về trang chủ
              </span>
            </Link>
          </div>
        </>
      )}
    </Sider>
  );
};

export default AdminSider;

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Layout } from "antd";
import Logo from "../common/LogoFull";

const { Header } = Layout;

const AdminHeader = ({ drawerVisible, setDrawerVisible }) => {
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  return (
    <Header className="flex items-center justify-between bg-white p-0 shadow-sm">
      <Button
        type="text"
        aria-label={drawerVisible ? "Close menu" : "Open menu"}
        icon={drawerVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setDrawerVisible(!drawerVisible)}
        className="text-gray-400 md:hidden"
      />
      <div className="block text-primary md:hidden">
        <Logo width={30} height={32} />
      </div>
      <div className="ms-auto flex items-center px-6">
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={
              <Badge dot>
                <Avatar
                  size={32}
                  src={
                    <img
                      src="https://robohash.org/admin.png?set=set4"
                      alt="avatar"
                    />
                  }
                  className="bg-rose-200"
                />
              </Badge>
            }
            className="h-12 rounded-full border border-gray-100 px-4 text-base font-semibold shadow-sm hover:text-primary"
          >
            Admin
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminHeader;

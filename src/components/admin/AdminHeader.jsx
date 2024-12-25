import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Avatar, Button, Dropdown, Layout } from "antd";

const { Header } = Layout;

const AdminHeader = () => {
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
      <div className="flex-1" />
      <div className="flex items-center px-6">
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

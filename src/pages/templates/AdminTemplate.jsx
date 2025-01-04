import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSider from "../../components/admin/AdminSider";

const AdminTemplate = () => {
  const { Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <Layout hasSider={true} className="min-h-screen overflow-hidden">
      <AdminSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
      <Layout>
        <AdminHeader
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
        <Content className="~m-0/4 ~p-4/0">
          <Outlet />
        </Content>
        <Footer className="mb-4 p-0 text-center italic ~text-xs/base">
          Airbnb Clone @2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;

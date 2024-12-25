import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSider from "../../components/admin/AdminSider";

const AdminTemplate = () => {
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="m-4 min-h-[calc(100vh-96px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;

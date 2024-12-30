import { Layout } from "antd";

const { Content } = Layout;

const AdminContent = ({ children }) => {
  return <Content>{children}</Content>;
};

export default AdminContent;

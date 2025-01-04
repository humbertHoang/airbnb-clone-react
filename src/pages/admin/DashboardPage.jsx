import {
  BookOutlined,
  DollarOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";

const { Title } = Typography;

const DashboardPage = () => {
  return (
    <div className="space-y-6 rounded-lg ~p-4/6">
      <Title level={2}>Tổng quan</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} lg={12} xl={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng số phòng"
              value={234}
              prefix={<HomeOutlined />}
              valueStyle={{ color: "#FF385C" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={12} xl={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng số đặt phòng"
              value={1234}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#008A05" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={12} xl={6}>
          <Card bordered={false}>
            <Statistic
              title="Người dùng"
              value={456}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#FFA500" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={12} xl={6}>
          <Card bordered={false}>
            <Statistic
              title="Doanh thu"
              value={789000000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#52c41a" }}
              suffix="₫"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

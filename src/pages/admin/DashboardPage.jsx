import {
  BookOutlined,
  DollarOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title } = Typography;

// Mock data - replace with real API data later
const bookingData = [
  { month: "Jan", bookings: 65 },
  { month: "Feb", bookings: 85 },
  { month: "Mar", bookings: 95 },
  { month: "Apr", bookings: 75 },
  { month: "May", bookings: 110 },
  { month: "Jun", bookings: 145 },
  { month: "Jul", bookings: 180 },
  { month: "Aug", bookings: 165 },
  { month: "Sep", bookings: 140 },
  { month: "Oct", bookings: 120 },
  { month: "Nov", bookings: 105 },
  { month: "Dec", bookings: 130 },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6 rounded-lg ~p-2/6">
      <Title level={2}>Tổng quan</Title>

      {/* Stats Cards */}
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

      {/* Booking Chart */}
      <Card bordered={false} className="mt-6">
        <Title level={4}>Thống kê đặt phòng</Title>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={bookingData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#FF385C"
                fill="#FF385C"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;

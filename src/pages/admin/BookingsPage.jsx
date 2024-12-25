import { Table, Button, Space, Input, Tag } from 'antd';
import { useState } from 'react';
import {
  SearchOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const BookingsPage = () => {
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      sorter: (a, b) => a.roomName.localeCompare(b.roomName),
    },
    {
      title: 'Khách',
      dataIndex: 'guestName',
      key: 'guestName',
      sorter: (a, b) => a.guestName.localeCompare(b.guestName),
    },
    {
      title: 'Ngày đến',
      dataIndex: 'checkIn',
      key: 'checkIn',
      sorter: (a, b) => new Date(a.checkIn) - new Date(b.checkIn),
    },
    {
      title: 'Ngày đi',
      dataIndex: 'checkOut',
      key: 'checkOut',
      sorter: (a, b) => new Date(a.checkOut) - new Date(b.checkOut),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Đã xác nhận', value: 'confirmed' },
        { text: 'Đang chờ', value: 'pending' },
        { text: 'Đã hủy', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const colors = {
          pending: 'gold',
          confirmed: 'green',
          cancelled: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Details
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleConfirm(record)}
              >
                Confirm
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleCancel(record)}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    console.log('View booking details:', record);
  };

  const handleConfirm = (record) => {
    console.log('Confirm booking:', record);
  };

  const handleCancel = (record) => {
    console.log('Cancel booking:', record);
  };

  return (
    <div className="rounded-lg bg-white shadow-md ~p-2/6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Quản lý đặt phòng</h1>
        <Space>
          <Input
            placeholder="Tìm kiếm phòng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Space>
      </div>
      <Table
        columns={columns}
        // Replace with actual data from your API
        dataSource={[]}
        rowKey="id"
      />
    </div>
  );
};

export default BookingsPage;

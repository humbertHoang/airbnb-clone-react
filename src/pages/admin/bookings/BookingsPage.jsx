import AdminActions from "@/components/admin/shared/AdminActions";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminPageWrapper from "@/components/admin/shared/AdminPageWrapper";
import AdminTable from "@/components/admin/shared/AdminTable";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import { App } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const BookingsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const PAGE_SIZE = 10;

  const { data, isLoading } = useGetBookingsQuery();
  const { bookings: allBookings = [] } = data || {};
  const [deleteBooking] = useDeleteBookingMutation();

  const filteredBookings = useMemo(() => {
    if (!searchText.trim()) return allBookings;

    const searchLower = searchText.toLowerCase().trim();
    return allBookings.filter((booking) =>
      Object.values(booking).some(
        (value) =>
          value && value.toString().toLowerCase().includes(searchLower),
      ),
    );
  }, [allBookings, searchText]);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredBookings.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredBookings, currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id).unwrap();
      message.success("Xóa đặt phòng thành công");
    } catch (error) {
      message.error("Xóa đặt phòng thất bại: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/bookings/edit/${id}`);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      sorter: (a, b) => a.maPhong - b.maPhong,
    },
    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      sorter: (a, b) => a.maNguoiDung - b.maNguoiDung,
    },
    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.ngayDen).unix() - dayjs(b.ngayDen).unix(),
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.ngayDi).unix() - dayjs(b.ngayDi).unix(),
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      sorter: (a, b) => a.soLuongKhach - b.soLuongKhach,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <AdminActions
          record={record}
          onEdit={handleEdit}
          onDelete={handleDelete}
          resourceName="mã đặt phòng"
        />
      ),
    },
  ];

  return (
    <AdminPageWrapper>
      <AdminPageHeader
        title="Quản lý đặt phòng"
        searchValue={searchText}
        onSearch={setSearchText}
        onAdd={() => navigate("/admin/bookings/add")}
        addText="Thêm đặt phòng"
        searchPlaceholder="Tìm kiếm đặt phòng..."
      />
      <AdminTable
        columns={columns}
        dataSource={paginatedBookings}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          total: filteredBookings.length,
        }}
        onChange={handleTableChange}
      />
    </AdminPageWrapper>
  );
};

export default BookingsPage;

import AdminActions from "@/components/admin/shared/AdminActions";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminPageWrapper from "@/components/admin/shared/AdminPageWrapper";
import AdminTable from "@/components/admin/shared/AdminTable";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useUploadRoomImageMutation,
} from "@/redux/api/roomApi";
import { App, Flex, Image, Tag, Tooltip } from "antd";
import { useDeferredValue, useState } from "react";
import { useNavigate } from "react-router";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const RoomsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const deferredSearchText = useDeferredValue(searchText);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { data, isLoading } = useGetRoomsQuery({
    pageIndex: currentPage,
    pageSize: 10,
    keyword: deferredSearchText,
  });
  const { rooms = [], pagination = {} } = data || {};
  const [deleteRoom] = useDeleteRoomMutation();
  const [uploadImage] = useUploadRoomImageMutation();

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id).unwrap();
      message.success("Xóa phòng thành công");
    } catch (error) {
      message.error("Xóa phòng thất bại: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/rooms/edit/${id}`);
  };

  const handleUpload = async (id, formData) => {
    try {
      await uploadImage({ id, formData }).unwrap();
      message.success("Upload hình ảnh thành công");
    } catch (error) {
      message.error("Upload hình ảnh thất bại: " + error.message);
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const renderAmenities = (record) => {
    const amenities = [
      { label: "Máy giặt", value: record.mayGiat },
      { label: "Bàn là", value: record.banLa },
      { label: "TV", value: record.tivi },
      { label: "Điều hoà", value: record.dieuHoa },
      { label: "WiFi", value: record.wifi },
      { label: "Bếp", value: record.bep },
      { label: "Đỗ xe", value: record.doXe },
      { label: "Hồ bơi", value: record.hoBoi },
      { label: "Bàn ủi", value: record.banUi },
    ];

    return (
      <Flex>
        {amenities
          .filter((amenity) => amenity.value)
          .map((amenity) => (
            <Tag key={amenity.label} color="blue">
              {amenity.label}
            </Tag>
          ))}
      </Flex>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (image, record) => (
        <Image
          src={image}
          alt={`Hình ảnh ${record.tenPhong}`}
          width={50}
          height={30}
          loading="lazy"
          className="object-cover"
          fallback="https://placehold.co/50x30"
        />
      ),
    },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (name) => (
        <Tooltip title={name}>
          <div className="max-w-[200px] truncate">{name}</div>
        </Tooltip>
      ),
      sorter: (a, b) => a.tenPhong.localeCompare(b.tenPhong),
    },
    {
      title: "Giá tiền",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.giaTien - b.giaTien,
    },
    {
      title: "Khách",
      dataIndex: "khach",
      key: "khach",
      sorter: (a, b) => a.khach - b.khach,
    },
    {
      title: "Phòng ngủ",
      dataIndex: "phongNgu",
      key: "phongNgu",
      sorter: (a, b) => a.phongNgu - b.phongNgu,
    },
    {
      title: "Giường",
      dataIndex: "giuong",
      key: "giuong",
      sorter: (a, b) => a.giuong - b.giuong,
    },
    {
      title: "Phòng tắm",
      dataIndex: "phongTam",
      key: "phongTam",
      sorter: (a, b) => a.phongTam - b.phongTam,
    },
    {
      title: "Tiện nghi",
      key: "amenities",
      render: (_, record) => renderAmenities(record),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <AdminActions
          record={record}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpload={handleUpload}
          resourceName="phòng"
          showUpload
        />
      ),
    },
  ];

  return (
    <AdminPageWrapper>
      <AdminPageHeader
        title="Quản lý phòng"
        searchValue={searchText}
        onSearch={setSearchText}
        onAdd={() => navigate("/admin/rooms/add")}
        addText="Thêm phòng"
        searchPlaceholder="Tìm kiếm phòng..."
      />
      <AdminTable
        columns={columns}
        dataSource={rooms}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: pagination.pageSize,
          total: pagination.totalRow,
        }}
        onChange={handleTableChange}
      />
    </AdminPageWrapper>
  );
};

export default RoomsPage;

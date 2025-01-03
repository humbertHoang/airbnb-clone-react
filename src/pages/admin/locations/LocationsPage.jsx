import AdminActions from "@/components/admin/shared/AdminActions";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminPageWrapper from "@/components/admin/shared/AdminPageWrapper";
import AdminTable from "@/components/admin/shared/AdminTable";
import {
  useDeleteLocationMutation,
  useGetLocationsPhanTrangQuery,
  useUploadLocationImageMutation,
} from "@/redux/api/locationApi";
import { App, Image, Tooltip } from "antd";
import { useDeferredValue, useState } from "react";
import { useNavigate } from "react-router";

const LocationsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const deferredSearchText = useDeferredValue(searchText);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { data, isLoading } = useGetLocationsPhanTrangQuery({
    pageIndex: currentPage,
    pageSize: 10,
    keyword: deferredSearchText,
  });
  const { locations = [], pagination = {} } = data || {};
  const [deleteLocation] = useDeleteLocationMutation();
  const [uploadImage] = useUploadLocationImageMutation();
  const handleDelete = async (id) => {
    try {
      await deleteLocation(id).unwrap();
      message.success("Xóa vị trí thành công");
    } catch (error) {
      message.error("Xóa vị trí thất bại: " + error.message);
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/locations/edit/${id}`);
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
          alt={`Hình ảnh ${record.tenViTri}`}
          width={50}
          height={30}
          loading="lazy"
          className="object-cover"
          fallback="https://placehold.co/50x30"
        />
      ),
    },
    {
      title: "Tên địa điểm",
      dataIndex: "tenViTri",
      key: "tenViTri",
      sorter: (a, b) => a.tenViTri.localeCompare(b.tenViTri),
      render: (name) => (
        <Tooltip title={name}>
          <div className="truncate">{name}</div>
        </Tooltip>
      ),
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      render: (province) => (
        <Tooltip title={province}>
          <div className="truncate">{province}</div>
        </Tooltip>
      ),
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
      render: (country) => (
        <Tooltip title={country}>
          <div className="truncate">{country}</div>
        </Tooltip>
      ),
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
          resourceName="vị trí"
          displayField="tenViTri"
          showUpload
        />
      ),
    },
  ];

  return (
    <AdminPageWrapper>
      <AdminPageHeader
        title="Quản lý vị trí"
        searchValue={searchText}
        onSearch={setSearchText}
        onAdd={() => navigate("/admin/locations/add")}
        addText="Thêm vị trí"
        searchPlaceholder="Tìm kiếm địa điểm..."
      />
      <AdminTable
        columns={columns}
        dataSource={locations}
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

export default LocationsPage;

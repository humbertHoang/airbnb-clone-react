import { Table } from "antd";

const AdminTable = ({
  columns,
  dataSource,
  loading,
  pagination,
  onChange,
  rowKey = "id",
}) => {
  return (
    <Table
      size="small"
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "max-content" }}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      loading={loading}
      onChange={onChange}
    />
  );
};

export default AdminTable;

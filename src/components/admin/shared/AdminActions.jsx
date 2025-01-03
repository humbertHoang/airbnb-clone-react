import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import DeleteConfirmModal from "./DeleteConfirmModal";
import UploadConfirmModal from "./UploadConfirmModal";

const AdminActions = ({
  record,
  onEdit,
  onDelete,
  onUpload,
  resourceName,
  displayField = "id",
  showUpload = false,
}) => {
  const { showDeleteConfirm } = DeleteConfirmModal({
    title: `Bạn có chắc muốn xoá ${resourceName} này?`,
    content: `Thực hiện sẽ xoá vĩnh viễn ${resourceName} ${record[displayField]}.`,
    onConfirm: () => onDelete(record.id),
  });
  const { showUploadConfirm, UploadModal } = UploadConfirmModal({
    title: `Upload hình ảnh cho ${resourceName} ${record[displayField]}`,
  });

  return (
    <Flex gap="small">
      <Tooltip title="Sửa">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onEdit(record.id)}
          size="small"
        />
      </Tooltip>
      {showUpload && (
        <Tooltip title="Upload hình">
          <Button
            icon={<UploadOutlined />}
            onClick={showUploadConfirm}
            size="small"
          />
        </Tooltip>
      )}
      <Tooltip title="Xoá">
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={showDeleteConfirm}
          size="small"
        />
      </Tooltip>
      {showUpload && (
        <UploadModal onConfirm={(formData) => onUpload(record.id, formData)} />
      )}
    </Flex>
  );
};

export default AdminActions;

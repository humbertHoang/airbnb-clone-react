import { ExclamationCircleOutlined } from "@ant-design/icons";
import { App } from "antd";
const DeleteConfirmModal = ({ title, content, onConfirm }) => {
  const { modal } = App.useApp();

  const showDeleteConfirm = () => {
    modal.confirm({
      centered: true,
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      okText: "Đồng ý",
      okType: "danger",
      okButtonProps: { size: "small" },
      cancelText: "Huỷ",
      cancelButtonProps: { size: "small" },
      onOk() {
        onConfirm();
      },
    });
  };

  return { showDeleteConfirm };
};

export default DeleteConfirmModal;

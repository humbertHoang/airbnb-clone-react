import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, Image, Modal, Upload } from "antd";
import { useEffect, useState } from "react";

const UploadConfirmModal = ({ title = "Upload hình ảnh" } = {}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { message } = App.useApp();

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ chấp nhận file hình ảnh (JPG, PNG)");
      return false;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Dung lượng hình ảnh phải nhỏ hơn 1MB!");
      return false;
    }
    setFile(file);
    return false;
  };

  const showUploadConfirm = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setFile(null);
    setPreviewUrl("");
  };

  const handleOk = (onConfirm) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("formFile", file);
    onConfirm(formData);
    handleCancel();
  };

  useEffect(() => {
    let objectUrl = "";
    if (file) {
      objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  return {
    showUploadConfirm,
    UploadModal: ({ onConfirm }) => (
      <Modal
        centered
        title={title}
        open={open}
        onOk={() => handleOk(onConfirm)}
        onCancel={handleCancel}
        okText="Upload"
        cancelText="Hủy"
        okButtonProps={{ disabled: !file }}
      >
        {!previewUrl ? (
          <Upload.Dragger
            maxCount={1}
            beforeUpload={beforeUpload}
            accept="image/jpeg, image/png"
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">
              Nhấp hoặc kéo file vào khu vực này để tải lên
            </p>
            <p className="ant-upload-hint">
              Chỉ chấp nhận file hình ảnh (JPG, PNG)
            </p>
          </Upload.Dragger>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>Xem trước:</p>
              <Button
                type="dashed"
                icon={<CloseOutlined />}
                onClick={() => {
                  setFile(null);
                  setPreviewUrl("");
                }}
              >
                Xóa
              </Button>
            </div>
            <Image src={previewUrl} alt="Preview" className="object-contain" />
          </div>
        )}
      </Modal>
    ),
  };
};

export default UploadConfirmModal;

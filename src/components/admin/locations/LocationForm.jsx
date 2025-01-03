import { Button, Form, Input, Space } from "antd";
import { Formik } from "formik";
import { locationValidationSchema } from "./LocationFormValidation";

const LocationForm = ({
  onSubmit,
  onCancel,
  initialValues,
  loading,
  isCreateMode,
}) => {
  const defaultValues = {
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
    ...initialValues,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={locationValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          layout="vertical"
          className="mx-auto max-w-2xl"
          onFinish={handleSubmit}
          role="form"
          aria-label={
            isCreateMode ? "Create Location Form" : "Edit Location Form"
          }
        >
          <Form.Item
            label="Tên vị trí"
            validateStatus={errors.tenViTri && touched.tenViTri ? "error" : ""}
            help={touched.tenViTri && errors.tenViTri}
          >
            <Input
              id="tenViTri"
              name="tenViTri"
              value={values.tenViTri}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập tên vị trí"
              aria-label="Location Name"
              aria-required="true"
              aria-invalid={
                errors.tenViTri && touched.tenViTri ? "true" : "false"
              }
              aria-describedby={
                errors.tenViTri && touched.tenViTri
                  ? "tenViTri-error"
                  : undefined
              }
              status={errors.tenViTri && touched.tenViTri ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Tỉnh thành"
            validateStatus={
              errors.tinhThanh && touched.tinhThanh ? "error" : ""
            }
            help={touched.tinhThanh && errors.tinhThanh}
          >
            <Input
              id="tinhThanh"
              name="tinhThanh"
              value={values.tinhThanh}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập tỉnh thành"
              aria-label="Province"
              aria-required="true"
              aria-invalid={
                errors.tinhThanh && touched.tinhThanh ? "true" : "false"
              }
              aria-describedby={
                errors.tinhThanh && touched.tinhThanh
                  ? "tinhThanh-error"
                  : undefined
              }
              status={errors.tinhThanh && touched.tinhThanh ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Quốc gia"
            validateStatus={errors.quocGia && touched.quocGia ? "error" : ""}
            help={touched.quocGia && errors.quocGia}
          >
            <Input
              id="quocGia"
              name="quocGia"
              value={values.quocGia}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập quốc gia"
              aria-label="Country"
              aria-required="true"
              aria-invalid={
                errors.quocGia && touched.quocGia ? "true" : "false"
              }
              aria-describedby={
                errors.quocGia && touched.quocGia ? "quocGia-error" : undefined
              }
              status={errors.quocGia && touched.quocGia ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            validateStatus={errors.hinhAnh && touched.hinhAnh ? "error" : ""}
            help={touched.hinhAnh && errors.hinhAnh}
          >
            <Input
              id="hinhAnh"
              name="hinhAnh"
              value={values.hinhAnh}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập URL hình ảnh"
              aria-label="Image URL"
              aria-required="true"
              aria-invalid={
                errors.hinhAnh && touched.hinhAnh ? "true" : "false"
              }
              aria-describedby={
                errors.hinhAnh && touched.hinhAnh ? "hinhAnh-error" : undefined
              }
              status={errors.hinhAnh && touched.hinhAnh ? "error" : ""}
            />
          </Form.Item>

          <Space className="flex justify-end">
            <Button onClick={onCancel}>Huỷ</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading || isSubmitting}
            >
              {isCreateMode ? "Tạo" : "Lưu"}
            </Button>
          </Space>
        </Form>
      )}
    </Formik>
  );
};

export default LocationForm;

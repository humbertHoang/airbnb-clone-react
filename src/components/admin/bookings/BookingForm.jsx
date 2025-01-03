import { Button, DatePicker, Form, InputNumber, Space } from "antd";
import dayjs from "dayjs";
import { Formik } from "formik";
import { bookingValidationSchema } from "./BookingFormValidation";

const BookingForm = ({
  initialValues,
  onSubmit,
  onCancel,
  loading,
  isCreateMode,
}) => {
  const defaultValues = {
    maPhong: "",
    maNguoiDung: "",
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: "",
    ...initialValues,
    ...(initialValues?.ngayDen && {
      ngayDen: dayjs(initialValues.ngayDen).format(),
    }),
    ...(initialValues?.ngayDi && {
      ngayDi: dayjs(initialValues.ngayDi).format(),
    }),
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedValues = {
        ...values,
        ngayDen: dayjs(values.ngayDen).toISOString(),
        ngayDi: dayjs(values.ngayDi).toISOString(),
        maPhong: Number(values.maPhong),
        maNguoiDung: Number(values.maNguoiDung),
        soLuongKhach: Number(values.soLuongKhach),
      };
      await onSubmit(formattedValues);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={bookingValidationSchema(isCreateMode)}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <Form
          layout="vertical"
          className="mx-auto max-w-2xl"
          onFinish={handleSubmit}
          role="form"
          aria-label={
            isCreateMode ? "Create Booking Form" : "Edit Booking Form"
          }
        >
          <Form.Item
            label="Mã phòng"
            validateStatus={errors.maPhong && touched.maPhong ? "error" : ""}
            help={touched.maPhong && errors.maPhong}
          >
            <InputNumber
              id="maPhong"
              name="maPhong"
              className="w-full"
              value={values.maPhong}
              onChange={(value) => setFieldValue("maPhong", value)}
              onBlur={handleBlur}
              min={1}
              placeholder="Nhập mã phòng"
              aria-label="Room ID"
              aria-required="true"
              aria-invalid={
                errors.maPhong && touched.maPhong ? "true" : "false"
              }
              status={errors.maPhong && touched.maPhong ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Mã người dùng"
            validateStatus={
              errors.maNguoiDung && touched.maNguoiDung ? "error" : ""
            }
            help={touched.maNguoiDung && errors.maNguoiDung}
          >
            <InputNumber
              id="maNguoiDung"
              name="maNguoiDung"
              className="w-full"
              value={values.maNguoiDung}
              onChange={(value) => setFieldValue("maNguoiDung", value)}
              onBlur={handleBlur}
              min={1}
              placeholder="Nhập mã người dùng"
              aria-label="User ID"
              aria-required="true"
              aria-invalid={
                errors.maNguoiDung && touched.maNguoiDung ? "true" : "false"
              }
              status={errors.maNguoiDung && touched.maNguoiDung ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Ngày đến"
            validateStatus={errors.ngayDen && touched.ngayDen ? "error" : ""}
            help={touched.ngayDen && errors.ngayDen}
          >
            <DatePicker
              id="ngayDen"
              name="ngayDen"
              className="w-full"
              value={values.ngayDen ? dayjs(values.ngayDen) : null}
              onChange={(date) => setFieldValue("ngayDen", date?.format())}
              onBlur={() => setFieldTouched("ngayDen", true)}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày đến"
              aria-label="Check-in Date"
              aria-required="true"
              aria-invalid={
                errors.ngayDen && touched.ngayDen ? "true" : "false"
              }
              status={errors.ngayDen && touched.ngayDen ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Ngày đi"
            validateStatus={errors.ngayDi && touched.ngayDi ? "error" : ""}
            help={touched.ngayDi && errors.ngayDi}
          >
            <DatePicker
              id="ngayDi"
              name="ngayDi"
              className="w-full"
              value={values.ngayDi ? dayjs(values.ngayDi) : null}
              onChange={(date) => setFieldValue("ngayDi", date?.format())}
              onBlur={() => setFieldTouched("ngayDi", true)}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày đi"
              aria-label="Check-out Date"
              aria-required="true"
              aria-invalid={errors.ngayDi && touched.ngayDi ? "true" : "false"}
              status={errors.ngayDi && touched.ngayDi ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Số lượng khách"
            validateStatus={
              errors.soLuongKhach && touched.soLuongKhach ? "error" : ""
            }
            help={touched.soLuongKhach && errors.soLuongKhach}
          >
            <InputNumber
              id="soLuongKhach"
              name="soLuongKhach"
              className="w-full"
              value={values.soLuongKhach}
              onChange={(value) => setFieldValue("soLuongKhach", value)}
              onBlur={handleBlur}
              min={1}
              max={16}
              placeholder="Nhập số lượng khách"
              aria-label="Number of Guests"
              aria-required="true"
              aria-invalid={
                errors.soLuongKhach && touched.soLuongKhach ? "true" : "false"
              }
              status={
                errors.soLuongKhach && touched.soLuongKhach ? "error" : ""
              }
            />
          </Form.Item>

          <Space className="w-full justify-end">
            <Button onClick={onCancel}>Hủy</Button>
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

export default BookingForm;

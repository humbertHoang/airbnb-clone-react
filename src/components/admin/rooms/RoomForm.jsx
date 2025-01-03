import { useGetLocationsQuery } from "@/redux/api/locationApi";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { Formik } from "formik";
import { roomValidationSchema } from "./RoomFormValidation";

const { TextArea } = Input;

const AMENITIES_OPTIONS = [
  { label: "Máy giặt", value: "mayGiat" },
  { label: "Bàn là", value: "banLa" },
  { label: "TV", value: "tivi" },
  { label: "Điều hòa", value: "dieuHoa" },
  { label: "Wifi", value: "wifi" },
  { label: "Bếp", value: "bep" },
  { label: "Đỗ xe", value: "doXe" },
  { label: "Hồ bơi", value: "hoBoi" },
  { label: "Bàn ủi", value: "banUi" },
];

const AMENITIES_KEYS = AMENITIES_OPTIONS.map((option) => option.value);

const RoomForm = ({
  initialValues,
  onSubmit,
  onCancel,
  loading,
  isCreateMode,
}) => {
  const { data } = useGetLocationsQuery();

  const defaultValues = {
    tenPhong: "",
    khach: "",
    phongNgu: "",
    giuong: "",
    phongTam: "",
    moTa: "",
    giaTien: "",
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: "",
    hinhAnh: "",
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={roomValidationSchema()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => {
        const renderFormField = (field, label, type = "text", options = {}) => {
          const {
            min,
            max,
            rows,
            formatter,
            parser,
            placeholder = `Nhập ${label.toLowerCase()}`,
          } = options;

          const commonProps = {
            name: field,
            value: values[field],
            onBlur: handleBlur,
            placeholder,
            "aria-label": label,
          };

          return (
            <Form.Item
              label={label}
              validateStatus={errors[field] && touched[field] ? "error" : ""}
              help={touched[field] && errors[field]}
            >
              {type === "number" ? (
                <InputNumber
                  {...commonProps}
                  className="w-full"
                  onChange={(value) => setFieldValue(field, value)}
                  min={min}
                  max={max}
                  formatter={formatter}
                  parser={parser}
                  prefix={formatter ? "₫" : ""}
                />
              ) : type === "textarea" ? (
                <TextArea
                  {...commonProps}
                  onChange={handleChange}
                  rows={rows}
                />
              ) : (
                <Input {...commonProps} onChange={handleChange} />
              )}
            </Form.Item>
          );
        };

        return (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="mx-auto max-w-2xl"
            role="form"
            aria-label={isCreateMode ? "Create Room Form" : "Edit Room Form"}
          >
            {renderFormField("tenPhong", "Tên phòng")}

            <Form.Item
              label="Vị trí"
              validateStatus={errors.maViTri && touched.maViTri ? "error" : ""}
              help={touched.maViTri && errors.maViTri}
            >
              <Select
                value={values.maViTri}
                onChange={(value) => setFieldValue("maViTri", value)}
                onBlur={() => handleBlur({ target: { name: "maViTri" } })}
                placeholder="Chọn vị trí"
                options={data?.locations?.map((location) => ({
                  value: location.id,
                  label: `${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`,
                }))}
                aria-label="Vị trí"
              />
            </Form.Item>

            <div className="grid gap-4 sm:grid-cols-4">
              {renderFormField("khach", "Số khách", "number", {
                min: 1,
                max: 16,
              })}
              {renderFormField("phongNgu", "Số phòng ngủ", "number", {
                min: 1,
                max: 8,
              })}
              {renderFormField("giuong", "Số giường", "number", {
                min: 1,
                max: 8,
              })}
              {renderFormField("phongTam", "Số phòng tắm", "number", {
                min: 1,
                max: 8,
              })}
            </div>
            {renderFormField("giaTien", "Giá tiền", "number", {
              min: 0,
              prefix: "₫",
              formatter: (value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
            })}
            {renderFormField("moTa", "Mô tả", "textarea", { rows: 4 })}

            <Form.Item
              label="Hình ảnh"
              validateStatus={errors.hinhAnh && touched.hinhAnh ? "error" : ""}
              help={touched.hinhAnh && errors.hinhAnh}
            >
              <Flex wrap gap="small">
                <Input
                  id="hinhAnh"
                  name="hinhAnh"
                  value={values.hinhAnh}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập URL hình ảnh"
                  aria-label="URL hình ảnh"
                />
                {values.hinhAnh && (
                  <Image
                    src={values.hinhAnh}
                    alt="preview"
                    className="object-cover"
                  />
                )}
              </Flex>
            </Form.Item>

            <Form.Item label="Tiện ích">
              <Select
                mode="multiple"
                placeholder="Chọn tiện ích"
                className="w-full"
                options={AMENITIES_OPTIONS}
                value={Object.entries(values)
                  .filter(
                    ([key, value]) => AMENITIES_KEYS.includes(key) && value,
                  )
                  .map(([key]) => key)}
                onChange={(selectedValues) => {
                  AMENITIES_KEYS.forEach((amenity) => {
                    setFieldValue(amenity, selectedValues.includes(amenity));
                  });
                }}
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
        );
      }}
    </Formik>
  );
};

export default RoomForm;

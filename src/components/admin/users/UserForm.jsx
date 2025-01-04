import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import { Formik } from "formik";
import { userValidationSchema } from "./UserFormValidation";

const { Option } = Select;

const UserForm = ({
  initialValues,
  onSubmit,
  onCancel,
  loading,
  isCreateMode,
}) => {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    role: "USER",
    gender: "true",
    ...(isCreateMode && { password: "", confirmPassword: "" }),
    ...initialValues,
    birthday: initialValues?.birthday ? dayjs(initialValues.birthday) : null,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { confirmPassword, ...apiValues } = values;
      confirmPassword && delete apiValues.confirmPassword;
      const formattedValues = {
        ...apiValues,
        birthday: values.birthday?.format("YYYY-MM-DD"),
      };
      await onSubmit(formattedValues);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={userValidationSchema(isCreateMode)}
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
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <Form
          {...(isCreateMode && {
            labelCol: { span: 6 },
            labelAlign: "left",
            wrapperCol: { span: 18 },
          })}
          layout={isCreateMode ? "horizontal" : "vertical"}
          className="mx-auto max-w-2xl"
          onFinish={handleSubmit}
          role="form"
          aria-label={isCreateMode ? "Create User Form" : "Edit User Form"}
        >
          <Form.Item
            label="Họ tên"
            validateStatus={errors.name && touched.name ? "error" : ""}
            help={touched.name && errors.name}
          >
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập họ tên"
              aria-label="Full Name"
              aria-required="true"
              aria-invalid={errors.name && touched.name ? "true" : "false"}
              aria-describedby={
                errors.name && touched.name ? "name-error" : undefined
              }
              status={errors.name && touched.name ? "error" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email && touched.email ? "error" : ""}
            help={touched.email && errors.email}
          >
            <Input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập email"
              type="email"
              aria-label="Email Address"
              aria-required="true"
              aria-invalid={errors.email && touched.email ? "true" : "false"}
              aria-describedby={
                errors.email && touched.email ? "email-error" : undefined
              }
              status={errors.email && touched.email ? "error" : ""}
            />
          </Form.Item>

          {isCreateMode && (
            <>
              <Form.Item
                label="Mật khẩu"
                validateStatus={
                  errors.password && touched.password ? "error" : ""
                }
                help={touched.password && errors.password}
              >
                <Input.Password
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                validateStatus={
                  errors.confirmPassword && touched.confirmPassword
                    ? "error"
                    : ""
                }
                help={touched.confirmPassword && errors.confirmPassword}
              >
                <Input.Password
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Số điện thoại"
            validateStatus={errors.phone && touched.phone ? "error" : ""}
            help={touched.phone && errors.phone}
          >
            <Input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            validateStatus={errors.birthday && touched.birthday ? "error" : ""}
            help={touched.birthday && errors.birthday}
          >
            <DatePicker
              id="birthday"
              name="birthday"
              value={values.birthday}
              onChange={(date) => setFieldValue("birthday", date)}
              onBlur={() => setFieldTouched("birthday", true)}
              className="w-full"
              placeholder="Chọn ngày sinh"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            validateStatus={errors.role && touched.role ? "error" : ""}
            help={touched.role && errors.role}
          >
            <Select
              id="role"
              name="role"
              value={values.role}
              onChange={(value) => setFieldValue("role", value)}
              onBlur={() => setFieldTouched("role", true)}
            >
              <Option value="USER">Người dùng</Option>
              <Option value="ADMIN">Quản trị viên</Option>
            </Select>
          </Form.Item>

          <Space className="flex justify-end">
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

export default UserForm;

import { Button, Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { changeUser } from "../redux/slice/userSlice";
const UpdateUserComponent = ({ userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      birthday: userInfo?.birthday,
      gender: userInfo?.gender,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Vui lòng nhập tên của bạn.")
        .min(3, "Tên phải có ít nhất 3 ký tự.")
        .matches(
          /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
          "Tên chỉ chứa chữ cái và khoảng trắng.",
        ),
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ.")
        .required("Vui lòng nhập email của bạn.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email không hợp lệ.",
        ),
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại của bạn.")
        .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số."),
      birthday: Yup.date()
        .required("Vui lòng nhập ngày sinh của bạn.")
        .max(new Date(), "ngày sinh không hợp lệ "),
      gender: Yup.string().required("Vui lòng chọn giới tính."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "PUT",
          url: `${import.meta.env.VITE_API_URL}/api/users/${userInfo.id}`,
          headers: {
            tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
          data: {
            ...values,
          },
        });
        dispatch(changeUser(response.data.content));
        localStorage.setItem("user", JSON.stringify(response.data.content));
      } catch (error) {
        console.log("🚀 ~ onSubmit: ~ error:", error);
      }
    },
  });
  useEffect(() => {}, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    formik.handleSubmit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <p
        onClick={showModal}
        className="cursor-pointer underline hover:text-blue-500"
      >
        chỉnh sửa hồ sơ
      </p>
      <Modal
        title="Cập nhật hồ sơ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu
          </Button>,
        ]}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-gray-700"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập tên của bạn"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập email của bạn"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Phone Input */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập số điện thoại của bạn"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-sm text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>

          {/* Birthday Input */}
          <div>
            <label
              htmlFor="birthday"
              className="mb-2 block font-medium text-gray-700"
            >
              Ngày sinh
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.birthday && formik.errors.birthday ? (
              <div className="text-sm text-red-500">
                {formik.errors.birthday}
              </div>
            ) : null}
          </div>
          {/* Gender Input */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Giới tính
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  checked={formik.values.gender == true}
                  onChange={() => formik.setFieldValue("gender", true)}
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={formik.values.gender == false}
                  onChange={() => formik.setFieldValue("gender", false)}
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                Nữ
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-sm text-red-500">{formik.errors.gender}</div>
            ) : null}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateUserComponent;

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Cấu hình Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "true",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Vui lòng nhập tên của bạn.")
        .min(3, "Tên phải có ít nhất 3 ký tự.")
        .matches(
          /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
          "Tên chỉ chứa chữ cái và khoảng trắng.",
        ), // Kiểm tra tên có thể chứa chữ cái có dấu hoặc không dấu và khoảng trắng

      email: Yup.string()
        .email("Địa chỉ email không hợp lệ.")
        .required("Vui lòng nhập email của bạn.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email không hợp lệ.",
        ), // Kiểm tra định dạng email
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu của bạn.")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.",
        ), // Kiểm tra mật khẩu có ít nhất một chữ cái và một số
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại của bạn.")
        .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số."), // Kiểm tra số điện thoại 10 chữ số
      birthday: Yup.date()
        .required("Vui lòng nhập ngày sinh của bạn.")
        .max(new Date(), "ngày sinh không hợp lệ "),
      gender: Yup.string().required("Vui lòng chọn giới tính."),
    }),
    onSubmit: async (values) => {
      try {
        await axios({
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          headers: {
            tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
          data: {
            email: values.email,
            password: values.password,
            name: values.name,
            phone: values.phone,
            birthday: values.birthday,
            gender: values.gender,
          },
        });
        toast.success("Tạo tài khoản thành công");
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data.content);
      }
    },
  });

  return (
    <div className="my-10 px-2 md:px-4 lg:px-0">
      <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-6 shadow-lg sm:max-w-lg lg:max-w-xl">
        <div className="mb-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111320.png"
            alt="Logo"
            className="mx-auto mb-4 h-20 w-20"
          />
          <h2 className="text-3xl font-semibold text-gray-800">Đăng Ký</h2>
          <p className="mt-2 text-gray-500">
            Tạo tài khoản mới để bắt đầu trải nghiệm
          </p>
        </div>
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

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="relative flex items-center rounded-md border border-gray-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                className="w-full rounded-md px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span
                className="absolute right-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </div>
            )}
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
                  checked={formik.values.gender === "true"}
                  onChange={formik.handleChange}
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
                  checked={formik.values.gender === "false"}
                  onChange={formik.handleChange}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Đăng Ký
          </button>
        </form>
        {/* Login Link */}
        <p className="mt-6 text-center text-gray-500">
          Đã có tài khoản?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Đăng nhập ngay
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpComponent;

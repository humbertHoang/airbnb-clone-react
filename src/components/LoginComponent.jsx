import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Địa chỉ email phải đúng định dạng'
        )
        .required('Vui lòng nhập email của bạn.'),
      password: Yup.string()
        .required('Vui lòng nhập mật khẩu của bạn.'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <div className="px-2 md:px-4 lg:px-0">
      <div className="mx-auto my-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:max-w-lg lg:max-w-xl border">
        <div className="mb-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111320.png"
            alt="Logo"
            className="mx-auto mb-4 h-20 w-20"
          />
          <h2 className="text-3xl font-semibold text-gray-800">Đăng Nhập</h2>
          <p className="mt-2 text-gray-500">Vui lòng đăng nhập để tiếp tục</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
              placeholder="Nhập email của bạn"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div>
  <label htmlFor="password" className="mb-2 block font-medium text-gray-700">
    Mật khẩu
  </label>
  <div className="relative flex items-center border border-gray-300 rounded-md">
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      placeholder="Nhập mật khẩu của bạn"
      className="w-full rounded-md px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
    />
    <span
      className="absolute right-3 text-gray-500 cursor-pointer"
      onClick={togglePasswordVisibility}
    >
      <i
        className={`fas ${
          showPassword ? 'fa-eye-slash' : 'fa-eye'
        }`}
      ></i>
    </span>
  </div>
  {formik.touched.password && formik.errors.password && (
    <div className="text-red-500 mt-1 text-sm">{formik.errors.password}</div>
  )}
</div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Đăng Nhập
          </button>
        </form>
        {/* Register Link */}
        <p className="mt-6 text-center text-gray-500">
          Không có tài khoản?{' '}
          <NavLink to={'/register'} className="text-blue-500 hover:underline">
            Đăng ký tại đây
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;

import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Form Section */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg sm:max-w-lg lg:max-w-xl">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Đăng Nhập
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Vui lòng đăng nhập để tiếp tục
        </p>
        <form className="mt-6 space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                className="w-full rounded-md border border-gray-300 px-10 py-2 outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                className="w-full rounded-md border border-gray-300 px-10 py-2 outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Đăng Nhập
          </button>
        </form>
        {/* Register Link */}
        <p className="mt-4 text-center text-gray-500">
          Không có tài khoản?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Đăng ký tại đây
          </a>
        </p>
      </div>


    </div>
  );
};

export default LoginPage;

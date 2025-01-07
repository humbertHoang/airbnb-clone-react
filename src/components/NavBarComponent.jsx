import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { userSelector } from "../redux/selectors";
import { logoutUser } from "../redux/slice/userSlice";

const NavBarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const userInfo = useSelector(userSelector);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  useEffect(() => {
    // Handle scroll event to add shadow on scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-white px-4 py-2 ${
          hasScrolled ? "shadow-md" : ""
        } transition-shadow duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </NavLink>

          {/* Desktop Links */}
          {userInfo ? (
            <div className="hidden items-center space-x-4 md:flex">
              {/* Hiển thị thông tin người dùng */}
              <div className="flex items-center gap-x-3">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-x-2 rounded-full p-2 transition hover:bg-gray-100 hover:shadow-md"
                >
                  <img
                    src={userInfo.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border border-gray-300"
                  />
                  <p className="text-sm font-medium text-gray-700 transition hover:text-gray-900">
                    {userInfo.name}
                  </p>
                </NavLink>
                {/* Nút Logout */}
                <button
                  className="flex items-center gap-x-2 rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 hover:shadow-md"
                  onClick={() => handleLogout()}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden space-x-4 md:flex">
              <NavLink
                to="/register"
                className="rounded-full bg-blue-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-blue-600 hover:shadow-md"
              >
                Đăng ký
              </NavLink>
              <NavLink
                to="/login"
                className="rounded-full border border-blue-500 px-6 py-2 text-blue-500 transition hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-md"
              >
                Đăng nhập
              </NavLink>
            </div>
          )}

          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center md:hidden">
            {userInfo ? (
              <div
                className="flex cursor-pointer items-center gap-x-3"
                onClick={toggleMenu}
              >
                <p className="text-sm font-semibold text-gray-700">
                  {userInfo.name}
                </p>
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow">
                  <img
                    src={userInfo.avatar || "/default-avatar.png"}
                    alt=""
                    className="h-full w-full object-center"
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={toggleMenu}
                className="rounded-full p-2 text-gray-700 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            )}

            {/* Mobile Menu */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute right-2 top-12 z-20 w-48 rounded-lg border bg-white shadow-md`}
            >
              {userInfo ? (
                <>
                  <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                    Tài khoản
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;

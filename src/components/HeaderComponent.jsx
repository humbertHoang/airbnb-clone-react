import {
  GlobalOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";
import { userSelector } from "../redux/selectors";
import { logoutUser } from "../redux/slice/userSlice";
import Logo from "./common/Logo";
import LogoFull from "./common/LogoFull";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const userInfo = useSelector(userSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setIsMenuOpen(false); // Close the menu after logout
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 bg-white transition-shadow duration-300 ${
        hasScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="relative">
        <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex-none lg:flex-shrink-0 lg:flex-grow lg:basis-[140px]">
            <NavLink
              to="/"
              className=":before:content-[''] relative inline-flex h-20 items-center align-middle text-primary outline-none transition-colors duration-200"
              aria-label="Trang chủ Airbnb"
            >
              <div className="hidden lg:block">
                <LogoFull width={102} height={32} />
              </div>
              <div className="block lg:hidden">
                <Logo width={30} height={32} />
              </div>
            </NavLink>
          </div>
          {!isAuthPage && (
            <>
              <div className="hidden min-w-[348px] flex-initial px-6 py-0 md:block lg:text-center">
                <div className="flex w-full items-center rounded-full border px-2 shadow-lg transition-shadow hover:shadow-md md:w-auto">
                  <Flex align="center" className="divide-x divide-gray-300">
                    <button className="flex items-center gap-2 rounded-full px-4 py-2">
                      <span className="font-medium">Địa điểm bất kỳ</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-full px-4 py-2">
                      <span className="font-medium">tuần bất kỳ</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-full px-4 py-2">
                      <span className="font-medium">Thêm khách</span>
                    </button>
                    <button className="ml-2 flex items-center rounded-full bg-primary p-2 text-white">
                      <SearchOutlined />
                    </button>
                  </Flex>
                </div>
              </div>
              {/* Desktop Links */}
              {userInfo ? (
                <div className="hidden items-center justify-end space-x-4 lg:flex lg:flex-shrink-0 lg:flex-grow lg:basis-[140px]">
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
                <div className="flex-shrink-0 flex-grow lg:basis-[140px]">
                  <nav
                    className="relative flex h-20 items-center justify-end"
                    aria-label="Hồ sơ"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <div className="flex items-center">
                        <Link
                          to="/"
                          className="hidden rounded-full p-3 font-semibold text-inherit transition duration-200 hover:bg-gray-100 md:block"
                        >
                          <span className="whitespace-nowrap">
                            Cho thuê chỗ ở qua Airbnb
                          </span>
                        </Link>
                        <button
                          className="hidden rounded-full px-4 py-3 transition duration-200 hover:bg-gray-100 lg:block"
                          aria-label="Chọn ngôn ngữ"
                        >
                          <GlobalOutlined />
                        </button>
                      </div>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "1",
                              label: (
                                <Link
                                  to="/register"
                                  className="px-4 py-2 font-medium hover:bg-gray-50"
                                >
                                  Đăng ký
                                </Link>
                              ),
                            },
                            {
                              key: "2",
                              label: (
                                <Link
                                  to="/login"
                                  className="px-4 py-2 hover:bg-gray-50"
                                >
                                  Đăng nhập
                                </Link>
                              ),
                            },
                            {
                              type: "divider",
                            },
                            {
                              key: "3",
                              label: (
                                <Link
                                  to="/"
                                  className="px-4 py-2 hover:bg-gray-50"
                                >
                                  Cho thuê chỗ ở qua Airbnb
                                </Link>
                              ),
                            },
                            {
                              key: "4",
                              label: (
                                <Link
                                  to="/"
                                  className="px-4 py-2 hover:bg-gray-50"
                                >
                                  Trợ giúp
                                </Link>
                              ),
                            },
                          ],
                        }}
                        placement="bottomRight"
                        trigger={["click"]}
                        overlayClassName="mt-2"
                      >
                        <Button className="flex items-center gap-2 rounded-full border border-gray-300 p-2 hover:shadow-lg">
                          <MenuOutlined className="text-lg" />
                          <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            className="bg-gray-300"
                          />
                        </Button>
                      </Dropdown>
                    </div>
                  </nav>
                </div>
              )}
            </>
          )}

          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center lg:hidden">
            {userInfo && (
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
            )}

            {/* Mobile Menu */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute right-2 top-12 z-20 w-48 rounded-lg border bg-white shadow-md`}
            >
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Tài khoản
                  </Link>
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
      </div>
    </header>
  );
};

export default HeaderComponent;

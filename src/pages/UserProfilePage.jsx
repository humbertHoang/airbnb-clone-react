import React, { useEffect } from "react";
import UserAvatarComponent from "../components/UserAvatarComponent";
import UserInfoComponent from "../components/UserInfoComponent";
import { useSelector } from "react-redux";
import { tokenSelector, userSelector } from "../redux/selectors";
import { useNavigate } from "react-router";

const UserProfilePage = () => {
  const userInfo = useSelector(userSelector);
  const token = useSelector(tokenSelector);
  const navigate = useNavigate();
  if(!userInfo) navigate('/login')
  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-0 grid grid-cols-12 gap-3">
      {/* Avatar của người dùng */}
      <div className="col-span-12 md:col-span-4 h-full rounded-lg border border-gray-300 p-4">
        <UserAvatarComponent userAvatar={userInfo?.avatar} token={token} />
      </div>
      {/* Thông tin chi tiết của người dùng */}
      <div className="col-span-12 md:col-span-8 h-full rounded-lg border border-gray-300 p-4">
        <UserInfoComponent userInfo={userInfo} />
      </div>
    </div>
  );
};

export default UserProfilePage;

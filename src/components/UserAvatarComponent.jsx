import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/slice/userSlice";

const UserAvatarComponent = ({ userAvatar, token }) => {
    const dispatch = useDispatch();
  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("formFile", file);
    if (file) {
      try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/upload-avatar`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
                token: token,
              },
            },
          );
          dispatch(changeUser(response.data.content));
          localStorage.setItem("user", JSON.stringify(response.data.content));
      } catch (error) {
        console.log(error)
      }
      
    }
  };
  return (
    <div className="flex h-full flex-col gap-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <img
          src={userAvatar}
          alt="avatar"
          className="h-40 w-40 rounded-full object-cover"
        />
        <label
          htmlFor="fileInput"
          className="text-md mt-2 cursor-pointer font-semibold underline hover:text-blue-600 hover:underline"
        >
          Cập nhật ảnh
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <hr />
      <div className="flex flex-col items-start gap-2 text-left">
        <h2 className="text-xl font-bold">Xác minh danh tính của bạn</h2>
        <p>
          Trước khi đặt phòng hoặc cho thuê trên Airbnb, bạn cần hoàn tất bước
          này.
        </p>
        <button className="rounded-md border border-gray-300 px-6 py-3 font-bold hover:bg-gray-100">
          Xác Minh
        </button>
      </div>
      <hr />
      <div className="text-left">
        <h2 className="text-xl font-bold">Thông tin xác nhận của bạn</h2>
        <p className="text-lg">
          <i className="fa-solid fa-check" /> Email
        </p>
      </div>
    </div>
  );
};

export default UserAvatarComponent;

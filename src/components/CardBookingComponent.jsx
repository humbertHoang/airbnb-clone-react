import React from "react";
import { DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

// Disable past dates in the date picker
const disabledDate = (current) => {
  return current && current < dayjs().endOf("day");
};

const CardBookingComponent = ({ detailRoom, userId }) => {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      maPhong: detailRoom?.id || null,
      ngayDen: new Date(),
      ngayDi: null,
      soLuongKhach: 1,
      maNguoiDung: userId || null,
    },
    validationSchema: Yup.object({
      maPhong: Yup.number().required("Mã phòng là bắt buộc"),
      ngayDen: Yup.date().nullable().required("Ngày đến là bắt buộc"),
      ngayDi: Yup.date().nullable().required("Ngày đi là bắt buộc"),
      soLuongKhach: Yup.number().required("Số lượng khách là bắt buộc"),
      maNguoiDung: Yup.number().required("Mã người dùng là bắt buộc"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        const response = await axios({
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/api/dat-phong`,
          headers: {
            tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
          data: {
            ...values,
          },
        });
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Generate options for the number of guests
  const options = Array.from({ length: detailRoom?.khach || 1 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} người`,
  }));

  // Handle date range picker changes
  const handleDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      formik.setFieldValue("ngayDen", dates[0].format("YYYY-MM-DD"));
      formik.setFieldValue("ngayDi", dates[1].format("YYYY-MM-DD"));
    } else {
      formik.setFieldValue("ngayDen", null);
      formik.setFieldValue("ngayDi", null);
    }
  };

  // Display the first validation error using toast
  const handleValidationErrors = () => {
    const errors = formik.errors;
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        toast.error(errors[key], { position: "top-center" });
        break; // Stop after showing the first error
      }
    }
  };

  // Calculate total days between check-in and check-out
  const totalDays =
    formik.values.ngayDen && formik.values.ngayDi
      ? dayjs(formik.values.ngayDi).diff(dayjs(formik.values.ngayDen), "day")
      : 0;

  // Calculate total price based on days and room price
  const roomPricePerNight = (detailRoom?.giaTien || 0) * 24000;
  const totalPrice = totalDays * roomPricePerNight;

  return (
    <div className="flex h-96 w-full lg:w-1/2 flex-col gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
      <h2 className="text-xl font-bold">
        {roomPricePerNight.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
        / đêm
      </h2>

      <Space direction="vertical" size={12} style={{ gap: "0" }}>
        <RangePicker
          className="w-full rounded-none px-4 py-2 text-gray-700"
          disabledDate={disabledDate}
          onChange={handleDateChange}
          placeholder={["Ngày đặt phòng", "Ngày trả phòng"]}
        />

        <Select
          className="w-full !rounded-none"
          placeholder="Số lượng khách"
          defaultValue={1}
          options={options}
          onChange={(value) => formik.setFieldValue("soLuongKhach", value)}
        />
      </Space>

      <button
        type="button"
        onClick={() => {
          if (!formik.isValid) {
            handleValidationErrors();
          } else {
            formik.handleSubmit();
          }
        }}
        className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-red-600"
      >
        Đặt phòng
      </button>

      <hr />

      <div className="flex items-center justify-between">
        <p className="underline">
          {roomPricePerNight.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
          x {totalDays} đêm
        </p>
        <p>
          {totalPrice.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="underline">Phí</p>
        <p>0 VND</p>
      </div>

      <hr />

      <div className="flex items-center justify-between">
        <p>Tổng tiền</p>
        <p>
          {totalPrice.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
    </div>
  );
};

export default CardBookingComponent;

import * as Yup from "yup";

export const bookingValidationSchema = (isCreateMode = false) =>
  Yup.object().shape({
    maPhong: Yup.number()
      .required("Vui lòng nhập mã phòng")
      .positive("Mã phòng phải là số dương")
      .integer("Mã phòng phải là số nguyên")
      .typeError("Mã phòng phải là số"),
    maNguoiDung: Yup.number()
      .required("Vui lòng nhập mã người dùng")
      .positive("Mã người dùng phải là số dương")
      .integer("Mã người dùng phải là số nguyên")
      .typeError("Mã người dùng phải là số"),
    ...(isCreateMode
      ? {
          ngayDen: Yup.date()
            .required("Vui lòng chọn ngày đến")
            .test(
              "is-future",
              "Ngày đến phải từ hôm nay trở đi",
              function (value) {
                if (!value) return false;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const checkInDate = new Date(value);
                checkInDate.setHours(0, 0, 0, 0);
                return checkInDate >= today;
              },
            )
            .typeError("Ngày không hợp lệ"),
        }
      : {
          ngayDen: Yup.date()
            .required("Vui lòng chọn ngày đến")
            .typeError("Ngày không hợp lệ"),
        }),
    ngayDi: Yup.date()
      .required("Vui lòng chọn ngày đi")
      .test("is-after-start", "Ngày đi phải sau ngày đến", function (value) {
        if (!value || !this.parent.ngayDen) return false;
        const checkInDate = new Date(this.parent.ngayDen);
        const checkOutDate = new Date(value);
        checkInDate.setHours(0, 0, 0, 0);
        checkOutDate.setHours(0, 0, 0, 0);
        return checkOutDate > checkInDate;
      })
      .typeError("Ngày không hợp lệ"),
    soLuongKhach: Yup.number()
      .required("Vui lòng nhập số lượng khách")
      .min(1, "Số lượng khách phải từ 1 trở lên")
      .max(16, "Số lượng khách không được vượt quá 16")
      .integer("Số lượng khách phải là số nguyên")
      .typeError("Số lượng khách phải là số"),
  });

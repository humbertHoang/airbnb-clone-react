import * as Yup from "yup";

export const roomValidationSchema = () =>
  Yup.object().shape({
    tenPhong: Yup.string()
      .required("Vui lòng nhập tên phòng")
      .max(100, "Tên phòng không được vượt quá 100 ký tự"),
    khach: Yup.number()
      .required("Nhập số lượng khách")
      .min(1, "Số lượng khách phải từ 1 trở lên")
      .max(16, "Số lượng khách không được vượt quá 16")
      .integer("Số lượng khách phải là số nguyên")
      .typeError("Số lượng khách phải là số"),
    phongNgu: Yup.number()
      .required("Nhập số phòng ngủ")
      .min(1, "Số phòng ngủ phải từ 1 trở lên")
      .max(8, "Số phòng ngủ không được vượt quá 8")
      .integer("Số phòng ngủ phải là số nguyên")
      .typeError("Số phòng ngủ phải là số"),
    giuong: Yup.number()
      .required("Nhập số giường")
      .min(1, "Số giường phải từ 1 trở lên")
      .max(8, "Số giường không được vượt quá 8")
      .integer("Số giường phải là số nguyên")
      .typeError("Số giường phải là số"),
    phongTam: Yup.number()
      .required("Nhập số phòng tắm")
      .min(1, "Số phòng tắm phải từ 1 trở lên")
      .max(8, "Số phòng tắm không được vượt quá 8")
      .integer("Số phòng tắm phải là số nguyên")
      .typeError("Số phòng tắm phải là số"),
    moTa: Yup.string()
      .required("Vui lòng nhập mô tả")
      .max(1000, "Mô tả không được vượt quá 1000 ký tự"),
    giaTien: Yup.number()
      .required("Nhập giá tiền")
      .min(0, "Giá tiền không được âm")
      .typeError("Giá tiền phải là số"),
    maViTri: Yup.number()
      .required("Vui lòng chọn vị trí")
      .positive("Mã vị trí không hợp lệ")
      .integer("Mã vị trí phải là số nguyên")
      .typeError("Mã vị trí phải là số"),
    hinhAnh: Yup.string().nullable(),
  });

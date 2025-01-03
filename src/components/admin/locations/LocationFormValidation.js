import * as Yup from "yup";

export const locationValidationSchema = Yup.object().shape({
  tenViTri: Yup.string().required("Tên vị trí là bắt buộc"),

  tinhThanh: Yup.string().required("Tỉnh thành là bắt buộc"),

  quocGia: Yup.string().required("Quốc gia là bắt buộc"),

  hinhAnh: Yup.string().nullable(),
});

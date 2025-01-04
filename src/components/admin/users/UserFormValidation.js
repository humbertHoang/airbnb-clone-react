import * as Yup from "yup";

export const userValidationSchema = (isCreateMode = false) =>
  Yup.object().shape({
    name: Yup.string()
      .required("Tên đăng nhập là bắt buộc")
      .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
      .max(12, "Tên đăng nhập không được vượt quá 12 ký tự"),

    email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),

    phone: Yup.string()
      .required("Số điện thoại là bắt buộc")
      .matches(/^[0-9]{10,11}$/, "Số điện thoại phải từ 10-11 số"),

    birthday: Yup.date()
      .required("Ngày sinh là bắt buộc")
      .max(new Date(), "Ngày sinh không thể trong tương lai")
      .test("age", "Người dùng phải trên 18 tuổi", function (value) {
        if (!value) return false;
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return value <= cutoff;
      }),

    role: Yup.string()
      .required("Vai trò là bắt buộc")
      .oneOf(["ADMIN", "USER"], "Vai trò không hợp lệ"),

    ...(isCreateMode && {
      password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
    }),
  });

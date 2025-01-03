export const theme = {
  token: {
    // Màu chủ đạo Airbnb
    colorPrimary: "#FF385C",
    colorSuccess: "#008A05",
    colorWarning: "#FFB400",
    colorError: "#C13515",
    colorInfo: "#428BFF",

    // Kiểu chữ
    colorTextBase: "#222222",
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
    fontWeightStrong: 600,

    // Border radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    // Colors
    colorBgContainer: "#FFFFFF",
    colorBgLayout: "#F7F7F7",
    colorBorder: "#DDDDDD",
    colorBorderSecondary: "#EBEBEB",
  },
  components: {
    Button: {
      controlHeight: 48,
      controlHeightSM: 36,
      controlHeightLG: 56,
      borderRadius: 8,
      primaryShadow: "none",
      fontWeight: 600,
      defaultBg: "#FFFFFF",
      defaultBorderColor: "#222222",
      defaultColor: "#222222",
      defaultHoverBg: "#F7F7F7",
    },
    Input: {
      controlHeight: 48,
      controlHeightSM: 36,
      controlHeightLG: 56,
      borderRadius: 8,
      paddingInline: 16,
      hoverBorderColor: "#222222",
      activeBorderColor: "#222222",
    },
    Select: {
      controlHeight: 48,
      controlHeightSM: 36,
      controlHeightLG: 56,
      borderRadius: 8,
      optionSelectedBg: "#F7F7F7",
      optionHoverBg: "#EBEBEB",
    },
    Table: {
      borderRadius: 12,
      headerBg: "#F7F7F7",
      headerColor: "#222222",
      rowHoverBg: "#F7F7F7",
      fontWeightStrong: 600,
      headerSplitColor: "#EBEBEB",
      borderColor: "#EBEBEB",
    },
    Card: {
      borderRadius: 12,
      boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08)",
      headerFontSize: 18,
      headerFontSizeSM: 16,
      headerHeight: 64,
      headerHeightSM: 48,
    },
    Layout: {
      bodyBg: "#F7F7F7",
      headerBg: "#FFFFFF",
      siderBg: "#FFFFFF",
    },
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: "#F7F7F7",
      itemHoverBg: "#EBEBEB",
      itemActiveBg: "#F7F7F7",
      itemHoverColor: "#FF385C",
      itemSelectedColor: "#FF385C",
      itemHeight: 48,
      itemMarginInline: 12,
      fontWeight: 500,
    },
    Form: {
      labelFontSize: 15,
      labelHeight: 24,
      labelColor: "#222222",
      verticalLabelPadding: 4,
      itemMarginBottom: 24,
    },
    Typography: {
      fontWeightStrong: 600,
      titleMarginTop: 0,
      titleMarginBottom: 8,
    },
  },
};

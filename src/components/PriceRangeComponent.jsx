import React, { useState, useEffect } from "react";

const PriceRangeComponent = ({ giaPhong, setGiaPhong }) => {
  const handleChangeTu = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ""); // Chỉ lấy số
    setGiaPhong((prev) => ({ ...prev, tu: value }));
  };

  const handleChangeDen = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ""); // Chỉ lấy số
    setGiaPhong((prev) => ({ ...prev, den: value }));
  };

  useEffect(() => {
    // Update input fields if giaPhong changes
  }, [giaPhong]);

  return (
    <div className="pb-6">
      <h3 className="font-semibold pb-4">Khoảng giá</h3>
      <div className="flex items-center gap-4">
        {/* Input giá từ */}
        <input
          type="text"
          value={giaPhong.tu || ""} // Hiển thị giá trị "từ"
          placeholder="₫ TỪ"
          onChange={handleChangeTu}
          className="w-full h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-400"
        />
        <div className="text-xl font-semibold text-gray-500">-</div>
        {/* Input giá đến */}
        <input
          type="text"
          value={giaPhong.den || ""} // Hiển thị giá trị "đến"
          placeholder="₫ ĐẾN"
          onChange={handleChangeDen}
          className="w-full h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-400"
        />
      </div>
    </div>
  );
};

export default PriceRangeComponent;

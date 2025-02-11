import { useEffect } from "react";

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
      <h3 className="pb-4 font-semibold">Khoảng giá</h3>
      <div className="flex items-center gap-4">
        {/* Input giá từ */}
        <input
          type="text"
          value={giaPhong.tu || ""}
          placeholder="₫ TỪ"
          onChange={handleChangeTu}
          className="h-10 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-gray-400 focus:outline-none"
        />
        <div className="text-xl font-semibold text-gray-500">-</div>
        {/* Input giá đến */}
        <input
          type="text"
          value={giaPhong.den || ""} // Hiển thị giá trị "đến"
          placeholder="₫ ĐẾN"
          onChange={handleChangeDen}
          className="h-10 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default PriceRangeComponent;

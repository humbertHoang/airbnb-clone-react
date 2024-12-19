const RoomAndBedFilterComponent = (props) => {
  const { listRoomAndBed, setListRoomAndBed } = props;

  // Hàm tăng số lượng
  const handleChangSoluongTang = (code) => {
    setListRoomAndBed((prevList) =>
      prevList.map((item) =>
        item.code === code
          ? { ...item, soLuong: item.soLuong + 1 }
          : item
      )
    );
  };

  // Hàm giảm số lượng không thấp hơn 1
  const handleChangSoluongGiam = (code) => {
    setListRoomAndBed((prevList) =>
      prevList.map((item) =>
        item.code === code
          ? { ...item, soLuong: item.soLuong > 1 ? item.soLuong - 1 : 1 }
          : item
      )
    );
  };

  return (
    <div className="py-6 border-t border-[#dddddd]">
      <h3 className="font-semibold pb-4">Rooms and beds</h3>
      {listRoomAndBed.map((item, index) => (
        <div key={index} className="flex items-center justify-between pb-3">
          <p className="text-[#222]">{item.name}</p>
          <div className="flex items-center justify-between">
            {/* Nút giảm số lượng */}
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                item.soLuong <= 1
                  ? "border-[#ebebeb] text-[#ebebeb] cursor-not-allowed"
                  : "border-[#B0B0B0] text-[#B0B0B0] hover:text-[#222] hover:border-[#222]"
              }`}
              onClick={() => handleChangSoluongGiam(item.code)}
              disabled={item.soLuong <= 1}
            >
              -
            </button>
            {/* Hiển thị số lượng */}
            <p className="px-2">{item.soLuong}</p>
            {/* Nút tăng số lượng */}
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-[#B0B0B0] hover:border-[#222] text-[#B0B0B0] hover:text-[#222]"
              onClick={() => handleChangSoluongTang(item.code)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomAndBedFilterComponent;
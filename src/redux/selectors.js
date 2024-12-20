import { createSelector } from "reselect";
import unorm from "unorm";

//filter slice
export const tienNghiSelector = (state) => state.filter.tienNghi;
export const roomAndBedSelector = (state) => state.filter.romAndBed;
export const giaPhongSelector = (state) => state.filter.giaPhong;
export const searchBarSelector = (state) => state.filter.searchBar;
//phong slice
export const listPhongSelector = (state) => state.phong.listPhong;
export const isLoadingPhongSelector = (state) => state.phong.isLoading;
export const isErrorPhongSelector = (state) => state.phong.isError;
//vitri slice
export const listViTriSelector = (state) => state.viTri.listViTri;
export const isLoadingViTriSelector = (state) => state.viTri.isLoading;
export const isErrorViTriSelector = (state) => state.viTri.isError;
export const filteredPhongSelector = createSelector([listPhongSelector, tienNghiSelector, roomAndBedSelector, giaPhongSelector, searchBarSelector], (listPhong, tienNghi, romAndBed, giaPhong, searchBar) => {
  return listPhong.filter((room) => {
    //kiểm tra tên phong
    const isNameMatch = unorm.nfd(room.tenPhong).replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(unorm.nfd(searchBar).replace(/[\u0300-\u036f]/g, "").toLowerCase());


    // Kiểm tra giá phòng
    const isGiaPhongMatch = (() => {
      if (giaPhong.tu !== undefined && giaPhong.tu !== "" && giaPhong.den !== undefined && giaPhong.den !== "") {
        return room.giaTien * 24000 >= giaPhong.tu && room.giaTien * 24000 <= giaPhong.den;
      } else if (giaPhong.tu !== undefined && giaPhong.tu !== "") {
        return room.giaTien * 24000 >= giaPhong.tu;
      } else if (giaPhong.den !== undefined && giaPhong.den !== "") {
        return room.giaTien * 24000 <= giaPhong.den;
      }
      return true; // Nếu không có giá trị `tu` hoặc `den`, bỏ qua kiểm tra giá phòng
    })();

    // Kiểm tra các tiện nghi
    const isTienNghiMatch = tienNghi.every((item) => {
      if (item.select) {
        return room[item.code] === true;
      }
      return true;
    });

    // Kiểm tra số lượng phòng và giường
    const isRoomAndBedMatch = romAndBed.every((item) => {
      if (item.soLuong > 0) {
        return room[item.code] >= item.soLuong;
      }
      return true;
    });

    // Trả về true nếu thỏa mãn tất cả các điều kiện
    return isGiaPhongMatch && isTienNghiMatch && isRoomAndBedMatch && isNameMatch;
  });
});

import React from "react";

const TienNghiFilterComponent = (props) => {
  const { listTienNghi,setListTienNghi } = props;
  const handleTienNghiClick = (selectedTienNghi) => {
    setListTienNghi((prevList) =>
      prevList.map((tienNghi) =>
        tienNghi.code === selectedTienNghi.code
          ? { ...tienNghi, select: !tienNghi.select }
          : tienNghi
      )
    );
  };
  return (
    <>
      <div className="py-6 border-t border-[#dddddd]">
        <h3 className="font-semibold pb-4">Tiện nghi</h3>
        <div className="flex flex-wrap gap-4">
          {listTienNghi.map((tienNghi) => (
            <div key={tienNghi.code} className={`flex items-center gap-2 border hover:border-black cursor-pointer rounded-full px-[18px] py-3 ${tienNghi.select ? "border-black" : "border-[#ddd]"}`} onClick={() => handleTienNghiClick(tienNghi)} >
              <img src={tienNghi.icon} alt="" className="w-6 h-6" />
              <p className="text-[#222]">{tienNghi.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TienNghiFilterComponent;

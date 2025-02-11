const TienNghiFilterComponent = (props) => {
  const { listTienNghi, setListTienNghi } = props;
  const handleTienNghiClick = (selectedTienNghi) => {
    setListTienNghi((prevList) =>
      prevList.map((tienNghi) =>
        tienNghi.code === selectedTienNghi.code
          ? { ...tienNghi, select: !tienNghi.select }
          : tienNghi,
      ),
    );
  };
  return (
    <>
      <div className="border-t border-[#dddddd] py-6">
        <h3 className="pb-4 font-semibold">Tiện nghi</h3>
        <div className="flex flex-wrap gap-4">
          {listTienNghi.map((tienNghi) => (
            <div
              key={tienNghi.code}
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-[18px] py-3 hover:border-black ${tienNghi.select ? "border-black" : "border-[#ddd]"}`}
              onClick={() => handleTienNghiClick(tienNghi)}
            >
              <img src={tienNghi.icon} alt="" className="h-6 w-6" />
              <p className="text-[#222]">{tienNghi.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TienNghiFilterComponent;

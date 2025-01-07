const BannerComponent = () => {
  return (
    <div className="relative h-screen w-full md:px-4 lg:px-0">
      <img
        src="https://www.canhovinhomes.land/datafiles/32907/upload/images/members/6.%20Phan%20khu%204/Beverly%202.jpg"
        alt="banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50 px-2 md:px-4 lg:px-0">
        <h1 className="mb-4 text-center text-3xl font-bold text-white">
          Chào mừng đến với website của chúng tôi!
        </h1>
        <a
          href="#listRoom"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-700"
        >
          Khám Phá
        </a>
      </div>
    </div>
  );
};

export default BannerComponent;

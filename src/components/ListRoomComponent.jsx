import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { filteredPhongSelector } from "../redux/selectors";
import CardComponent from "./CardComponent";
import FilterComponent from "./FilterComponent";

const INITIAL_DISPLAY_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const RoomListHeader = () => (
  <div className="mb-4 flex flex-col gap-2 justify-between md:flex-row md:items-center" >
    <h2 className="text-start font-bold ~text-xl/2xl">
      Danh Sách Phòng Cho Thuê
    </h2>
    <FilterComponent />
  </div>
);

const EmptyRoomState = () => (
  <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100 text-center shadow-md">
    <div>
      <h2 className="mb-4 text-3xl font-semibold text-gray-700">
        Không tìm thấy Phòng
      </h2>
      <p className="text-lg text-gray-500">
        Chúng tôi không thể tìm thấy phòng nào phù hợp với tiêu chí của bạn.
      </p>
    </div>
  </div>
);

const RoomGrid = ({ rooms }) => (
  <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-y-10 xl:gap-x-6">
    {rooms.map((phong) => (
      <div
        key={phong.id}
        className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
      >
        <CardComponent phong={phong} roomId={phong.id} />
      </div>
    ))}
  </div>
);

const LoadingIndicator = ({ isLoading }) => (
  <div className="mt-8 flex justify-center">
    {isLoading ? (
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
    ) : (
      <div className="h-10"></div>
    )}
  </div>
);

const InfiniteScrollTrigger = ({ onIntersect }) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 },
    );

    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => observer.disconnect();
  }, [onIntersect]);

  return <div ref={triggerRef} />;
};

const ListRoomComponent = () => {
  const allRooms = useSelector(filteredPhongSelector);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const displayedRooms = allRooms.slice(0, displayCount);

  const loadMore = useCallback(() => {
    if (!isLoading && displayCount < allRooms.length) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, allRooms.length),
        );
        setIsLoading(false);
      }, 250);
    }
  }, [isLoading, displayCount, allRooms.length]);

  useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY_COUNT);
    setIsLoading(false);
  }, [allRooms]);

  return (
    <div className="container mx-auto px-2 py-3 md:px-4 lg:px-0">
      <RoomListHeader />
      {allRooms.length === 0 ? (
        <EmptyRoomState />
      ) : (
        <>
          <RoomGrid rooms={displayedRooms} />
          {displayCount < allRooms.length && (
            <>
              <LoadingIndicator isLoading={isLoading} />
              <InfiniteScrollTrigger onIntersect={loadMore} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ListRoomComponent;

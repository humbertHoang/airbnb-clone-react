import ListPhongDaDatComponent from "./ListPhongDaDatComponent";
import UpdateUserComponent from "./UpdateUserComponent";

const UserInfoComponent = ({ userInfo }) => {
  
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold">xin chào, {userInfo?.name}</h2>
        <UpdateUserComponent userInfo={userInfo} />
      </div>
      <div className="h-full overflow-y-auto">
      <h2 className="text-2xl font-bold">Phòng đã đặt</h2>
          <ListPhongDaDatComponent userId={userInfo?.id}/>
      </div>
    </div>
  );
};

export default UserInfoComponent;

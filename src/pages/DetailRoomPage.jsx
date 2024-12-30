import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { listPhongSelector } from '../redux/selectors'
import RoomInfoComponent from '../components/RoomInfoComponent'

const DetailRoomPage = () => {
  const roomId = useParams().roomId
  const [detailRoom,setDetailRoom] = useState({})
  const listRoom = useSelector(listPhongSelector)
  useEffect(()=> {
  if(listRoom.length !== 0, roomId) setDetailRoom(listRoom.find((room) => room.id == roomId))
  },[roomId,listRoom])
  return (
    <div className='container mx-auto px-2 md:px-4 lg:px-0'>
      <RoomInfoComponent detailRoom={detailRoom}/>
    </div>
  )
}

export default DetailRoomPage

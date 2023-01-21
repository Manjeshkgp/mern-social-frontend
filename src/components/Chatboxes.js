import React, { useEffect, useState } from 'react';
import dummyUserImage from "../assets/user.png";
import { useNavigate } from 'react-router-dom';

const Chatboxes = ({anotherUserId,token}) => {
    const [anotherUser,setAnotherUser] = useState("");
    const navigate = useNavigate();
    const fetchAnotherUser = async()=>{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${anotherUserId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data = await res.json()
        if(res.status === 200){
            setAnotherUser(data)
        }
    }
    useEffect(()=>{fetchAnotherUser()},[anotherUserId])
  return (<>
  <div onClick={()=>{navigate(`/messages/${anotherUserId}`)}} className="bg-violet-500 row-span-1 h-24 w-full mt-1 rounded-sm flex items-center justify-start">
      <div className="flex justify-center items-center ml-2">
        <img src={`${process.env.REACT_APP_API_URL}/${anotherUser?.image}`} onError={(e)=>{e.currentTarget.src=`${dummyUserImage}`}} className="h-20 w-20 rounded-full" alt="" />
      </div>
      <div className="flex flex-col justify-around items-start ml-2">
        <p className='text-lg font-medium'>{anotherUser?.username}</p>
        <p className=''>Offline</p>
      </div>
    </div>
    <hr />
  </>)
}

export default Chatboxes
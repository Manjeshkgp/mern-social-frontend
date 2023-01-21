import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Chatboxes from '../components/Chatboxes';

const Messages = () => {
  const token = Cookies.get("token")
  const identification = Cookies.get("identification")
  const [chats,setChats] = useState([]);
  const fetchMessages = async ()=>{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chat/${identification}`)
    const data = await res.json();
    if(res.status===200){
      setChats(data);
      console.log(data)
    }
  }

  useEffect(()=>{
    fetchMessages()
  },[])

  return (<>
  <div className="w-screen h-screen bg-yellow-300 flex flex-col items-center md:w-[calc(100vw-72px)] md:ml-[72px] xl:w-[calc(100vw-220px)] xl:ml-[220px]">
  <div className="fixed top-12 bg-orange-300 w-full h-12 md:w-[calc(100%-72px)] xl:w-[calc(100%-220px)] z-50 text-xl font-bold text-center">
        Messages Feature Under Construction
    </div>
    <div className="h-12 w-[calc(100%-1rem)] bg-blue-300 mt-2 flex items-center">
    <p className='text-xl font-semibold ml-2'>&#8592; Chats</p>
    </div>
    <div className="bg-green-300 w-[calc(100%-1rem)] h-[calc(100vh-6rem)] md:h-full overflow-scroll">
      {chats.map((singleChat)=>(<div key={singleChat._id} onClick={()=>{console.log(singleChat.members)}}><Chatboxes anotherUserId={singleChat.members.find(str=>str!==identification)} token={token} /></div>))}
    </div>
  </div>
  </>)
}

export default Messages
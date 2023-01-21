import React from "react";
import Cookies from "js-cookie";
import {format} from "timeago.js"

const Messages = ({ singleMessage }) => {
  const myId = Cookies.get("identification");
  return (
    <>
      {singleMessage.senderId === myId ? (
        <div className="w-[100%] bg-slate-500 flex flex-col items-end">
          <p className="px-2 py-[2px] rounded-2xl bg-gradient-to-tr from-violet-700 to-pink-700 w-max mx-1 text-white max-w-[70%]">
            {singleMessage.text}
          </p>
        <p className="text-[0.7rem] text-gray-300 mx-2">{format(singleMessage.createdAt)}</p>
        </div>
      ) : (
        <div className="w-[100%] bg-slate-500 flex flex-col">
          <p className="px-2 py-[2px] rounded-2xl bg-gradient-to-tr from-blue-700 to-green-700 w-max mx-1 text-white max-w-[70%]">
            {singleMessage.text}
          </p>
          <p className="text-[0.7rem] text-gray-300 mx-2">{format(singleMessage.createdAt)}</p>
        </div>
      )}
    </>
  );
};

export default Messages;

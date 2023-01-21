import { useState,useRef } from "react";
import {useNavigate,redirect} from "react-router-dom";
import userProfileImage from "../assets/user.png";

export default function UserPosts({height,profileImage,posts,setShowPostsdiv,setScrollTo}) {
  const navigate = useNavigate()
  const [isLongPress, setIsLongPress] = useState(false);
  const [longPressImage,setLongPressImage] = useState("");
  const timeoutId = useRef(null);

  const handleTouchStart = (e) => {
    console.log("touch start")
    timeoutId.current = setTimeout(() => {
      setIsLongPress(true);
      setLongPressImage(e.target.currentSrc)
    }, 400); // Adjust this value to change the long press threshold
  };

  const handleTouchMove = () => {
    clearTimeout(timeoutId.current);
  }

  const handleTouchEnd = () => {
    clearTimeout(timeoutId.current);
    console.log("touch end")
    setIsLongPress(false);
  };
  if(isLongPress){
    window.document.body.style.overflowY = "hidden";
  }else{
    window.document.body.style.overflowY = "auto";
  }

  // posts.map((singlePost)=>console.log(singlePost?.imgUrl))
  return (
    <>
      {isLongPress ? (
        <div>
          <div style={{transform:`translateY(-${height+17.8}rem)`}} className='fixed flex justify-center items-center h-[100vh] w-[100vw] z-30'>
            <div className="w-[95%] bg-slate-600 flex flex-col rounded-lg customShadow">
              <div className="h-12 flex items-center justify-start">
                <img onError={(e)=>e.currentTarget.src=userProfileImage} src={profileImage} alt="" className="h-8 w-8 rounded-full object-cover ml-2"/>
                <p className="ml-2 font-medium">@manjeshkrsharma</p>
              </div>
              <img src={`${longPressImage}`} alt="" className="w-[100%] max-h-[calc(100vh_-_12rem)] object-cover h-auto"/>
              <div className="flex items-center justify-around h-12">
                <p className="font-medium">Like</p>
                <p className="font-medium">Comment</p>
                <p className="font-medium">Share</p>
                <p className="font-medium">3dot</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {posts.map((singlePost)=>(<div
          key={singlePost?._id}
          className="w-[33.33vw] h-[33.33vw] md:w-[31%] md:h-[30vw] md:max-h-[295px] md:max-w-[295px] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/${singlePost?.imgUrl}`}
            alt=""
            className="object-cover w-[98%] h-[98%]" onTouchStart={(e)=>handleTouchStart(e)} onTouchEnd={handleTouchEnd} onTouchMove={()=>handleTouchMove()} onClick={(e)=>{setShowPostsdiv(true);setScrollTo(singlePost._id)}}
          />
        </div>))}
      
    </>
  );
}

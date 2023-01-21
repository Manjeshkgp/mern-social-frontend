import React, { useEffect } from "react";
import userProfileImage from "../assets/user.png";
import { LikeIcon, CommentIcon, ShareIcon, SaveIcon, LikedIcon } from "../assets/Icons.js";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Postsdiv = ({ allPostsState, setAllPostsState ,scrollTo, socket }) => {
  const navigate = useNavigate()
  socket.on("newArrayForHome",(newArrayForHome)=>{
    // console.log(newArrayForHome)
    setAllPostsState(newArrayForHome)
  })
  const username = Cookies.get("username");
    const token = Cookies.get("token");
  const descControl = (e) => {
    const classes = e.currentTarget.classList;
    if (classes.contains("customEllipsis")) {
      classes.remove("customEllipsis");
    } else {
      classes.add("customEllipsis");
    }
  };
  const postComment = async (commentString,post_id) => {
    if(commentString.length===0){
      return
    }
    const bodyData = JSON.stringify({
      postId:post_id,
      username:username,
      commentString:commentString
    })
    const res = await fetch(`${process.env.REACT_APP_API_URL}/allposts/comment/${username}`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body:bodyData
    });
    const data = await res.json();
    if(res.status===200){
      console.log(data);
    }
  };
  const executeScroll = () => {
    if (scrollTo != null) {
      document.getElementById(scrollTo).scrollIntoView(); // scrollIntoView({}) no parameters added since not required
    }
    return;
  };
  useEffect(()=>{
    executeScroll()
  },[scrollTo])

  const fetchLike = async (e) => {
    const requiredJson = JSON.stringify({postId:e._id})
    const res = await fetch(`${process.env.REACT_APP_API_URL}/allposts/like/${username}`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json",
        },
        body:requiredJson,
    })
    const data = await res.json();
    if(res.status===200){
        console.log(data);
    }
    else if(res.status===209){
      console.log(data);
    }
  }

//   allPostsState.map((singlePost)=>{console.log(singlePost.likesArray.some(obj=>obj.username===username))}) // returns true/false
//   allPostsState.map((singlePost)=>{console.log(singlePost.likesArray.find(obj=>obj.username===username))}) // returns whole object/element or undefined when array doesn't have the desired string
  
  return (
    <>
      {allPostsState.map((singlePost) => (
        <div
        id={singlePost._id}
          key={singlePost._id}
          className="flex justify-center items-center mb-12 border border-[#262626] rounded-lg first:mt-4"
        >
          <div className="bg-black flex flex-col rounded-lg">
            <div onClick={()=>{navigate(`/user/${singlePost.postedBy}`)}} className="h-12 flex items-center justify-start">
              <img
                src={`${process.env.REACT_APP_API_URL}/${singlePost.postedByProfileImage}`}
                alt=""
                onError={(e) => (e.currentTarget.src = userProfileImage)}
                className="h-8 w-8 rounded-full object-cover ml-2"
              />
              <p className="ml-2 font-medium text-white">
                {singlePost.postedBy}
              </p>
            </div>
            <img
              src={`${process.env.REACT_APP_API_URL}/${singlePost.imgUrl}`}
              alt="Loading..."
              className=" w-[calc(100vw-4px)] h-full max-h-[calc(100vh_-_12rem)] object-cover"
            />
            <div className="flex items-center justify-around h-12 border-b border-[#262626]">
              <div onClick={()=>{fetchLike(singlePost)}} className="font-medium text-white">
                {singlePost?.likesArray?.some(obj=>obj.username===username)?<p onClick={()=>{socket.emit("unlike_image",{socketId:socket.id,post_id:singlePost._id,userUsername:username})}}><LikedIcon/></p>:<p onClick={()=>{socket.emit("like_image",{socketId:socket.id,post_id:singlePost._id,userUsername:username})}} ><LikeIcon/></p>}
              </div>
              <p className="font-medium text-white">
                <CommentIcon />
              </p>
              <p className="font-medium text-white">
                <ShareIcon />
              </p>
              <p className="font-medium text-white">
                <SaveIcon />
              </p>
            </div>
            <div className="flex items-start flex-col justify-around mb-1">
              <div className="ml-2 mr-2 font-semibold text-white">
                {singlePost.likesArray?.length || 0} Likes
              </div>
              <div className="ml-2 mr-2">
                <p
                  onClick={(e) => {
                    descControl(e);
                  }}
                  className="customEllipsis text-white"
                >
                  {singlePost.description}
                </p>
              </div>
              <Link to={`/posts/${singlePost._id}/comments`} className="ml-2 mr-2 text-gray-300 cursor-pointer">
                {singlePost.comments.length === 0
                  ? ""
                  : `View all ${singlePost.comments.length} comments`}
              </Link>
              <div className="ml-2 mr-2 text-sm text-gray-300">
                {singlePost.postedAt} 1 day ago
              </div>
            </div>
            <div className="flex justify-around items-center border-t border-[#262626]">
              <textarea
                className="resize-y focus:outline-none w-full ml-2 rounded-sm text-gray-200 bg-black"
                placeholder="Write a comment..."
                rows="1"
              ></textarea>
              <button
                onClick={(e) => {
                  postComment(e.currentTarget.previousElementSibling.value,singlePost._id);
                  e.currentTarget.previousElementSibling.value=""
                }}
                className="text-white p-2"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Postsdiv;

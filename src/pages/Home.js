import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Postsdiv from "../components/Postsdiv.js";
import dummyUserImage from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  // const scrollRef = useRef(null);
  const [allPostsState, setAllPostsState] = useState([]);
  const [newlyJoinedUsers, setNewlyJoinedUsers] = useState([]);
  const [page,setPage] = useState(0);
  // const scrollLeft = () => {
  //   scrollRef.current.scrollLeft -= 200;
  // };
  // const scrollRight = () => {
  //   scrollRef.current.scrollLeft += 200;
  // };
  const pcSize = window.matchMedia("(min-width: 1023px)").matches;
  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >=
        document.documentElement.scrollHeight
      ) {
        // setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllposts = async () => {
    const token = Cookies.get("token");
    const identification = Cookies.get("identification");
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/allposts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );
    const { allposts } = await res.json();
    if(allposts.length === 0){
      return;
    }
    else if (res.status === 200) {
      socket.emit("HomePagePosts", [...allPostsState,...allposts]);
      setAllPostsState((prev)=>[...prev,...allposts]);
    }
    console.log(allposts);
  };

  const fetchNewUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/allusers`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setNewlyJoinedUsers(data.usersArray);
      console.log(newlyJoinedUsers)
    }
  };
  // Remember that MongoDB allows only 100-crud-operations/second, so loading of post's user image is a big deal
  useEffect(() => {
    if (pcSize === true) {
      fetchNewUsers();
    }
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
  useEffect(()=>{fetchAllposts()},[page])

  return (
    <div className="flex flex-row mt-[45px] md:mt-0 justify-center md:ml-[72px] xl:ml-[220px] bg-[#121212]">
      <div className="bg-[#121212] w-[100vw] md:w-[470px] lg:mr-8">
        {/* <button onClick={e=>scrollLeft()} className="hidden h-[86px] w-4 bg-yellow-300 opacity-40 md:grid place-items-center absolute"><LeftArrowIcon/></button> */}
        {/* <button onClick={e=>scrollRight()} className="hidden h-[86px] w-4 bg-yellow-300 opacity-40 md:grid place-items-center absolute ml-[calc(470px-1rem)]"><RightArrowIcon/></button> */}
        {/* <div ref={scrollRef} className="statusesDiv bg-black rounded-lg border border-[#262626] h-[86px] flex flex-row items-center gap-2 overflow-x-scroll mx-1 md:overflow-hidden md:mx-3">
          <div className="h-20 w-16 bg-green-300 flex flex-col items-center">
            <div className="flex justify-center items-center h-[4rem] w-[4rem] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"><img src="https://dummyimage.com/720x300" alt="" className="h-14 w-14 object-cover rounded-full outline-2"/></div>
            <p className="text-[11px] text-white font-normal max-w-[60px] text-center overflow-x-hidden text-ellipsis">
              Lorem_Ipsum
            </p>
          </div>
          <p className="text-white w-full text-center text-xl">Status Elements will be Added soon</p> 
        </div> */}
        <div className="postsDiv">
          <Postsdiv
            allPostsState={allPostsState}
            setAllPostsState={setAllPostsState}
            scrollTo={null}
            socket={socket}
          />
        </div>
      </div>
      <div className="bg-[#121212] hidden w-80 lg:flex lg:flex-col mt-4 items-center">
        <p className="text-white font-bold">Newly Joined on Imagegram</p>
        {newlyJoinedUsers.map((singleUser) => (
          <div key={singleUser._id} onClick={()=>{navigate(`/user/${singleUser.username}`)}} className="m-2 w-72 rounded-md flex bg-black">
            <div className="w-20 h-20 grid place-items-center">
              <img
                src={`${process.env.REACT_APP_API_URL}/${singleUser?.profileImage?.imgUrl}`}
                onError={(e) => {
                  e.currentTarget.src = `${dummyUserImage}`;
                }}
                alt=""
                className="object-cover w-16 h-16 rounded-full border border-yellow-100"
              />
            </div>
            <div className="h-20 grid content-center mx-1">
              <p className="text-white font-bold">{singleUser.username}</p>
              <p className="text-white font-medium">{singleUser.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

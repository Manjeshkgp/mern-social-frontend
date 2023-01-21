import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import UserPosts from "../components/UserPosts";
import userProfileImage from "../assets/user.png";
import Postsdiv from "../components/Postsdiv";
import { LeftArrowIcon } from "../assets/Icons";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = ({ socket }) => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const [theirProfileId,setTheirProfileId] = useState("");
  const [scrollTo, setScrollTo] = useState(null);
  const [showPostsdiv, setShowPostsdiv] = useState(false);
  const elementRef = useRef(null);
  const tabSize = window.matchMedia("(min-width: 767px)").matches;
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profileName, setProfileName] = useState("");
  const [description, setDescription] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [followersArray, setFollowersArray] = useState([]);
  const { theirusername } = useParams();
  if (theirusername === Cookies.get("username")) {
    navigate("/profile");
  }
  const identification = Cookies.get("identification");
  const token = Cookies.get("token");
  const fetchProfile = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${identification}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "image/png",
      },
    });
    const profileData = await res.json();
    setImage(profileData.image);
    setPosts(profileData.posts);
    setUsername(profileData.username);
    setProfileName(profileData.name);
    setDescription(profileData.description);
    setFollowers(profileData.followers.length || 0);
    setFollowing(profileData.following.length || 0);
    console.log(profileData.posts);
    socket.emit("profile_Data", profileData.posts);
  };
  const fetchTheirProfile = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${theirusername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "image/png",
      },
    });
    const profileData = await res.json();
    setImage(profileData.image);
    setPosts(profileData.posts);
    setUsername(profileData.username);
    setProfileName(profileData.name);
    setDescription(profileData.description);
    setFollowers(profileData.followers.length || 0);
    setFollowing(profileData.following.length || 0);
    setFollowersArray(profileData?.followers || []);
    setTheirProfileId(profileData?._id);
    console.log(profileData.posts);
    socket.emit("profile_Data", profileData.posts);
    socket.emit("theirProfile_followers",profileData.followers);
  };
  useEffect(() => {
    if (theirusername === undefined || theirusername === null) {
      fetchProfile();
    } else {
      fetchTheirProfile();
    }
    setHeight(elementRef.current.clientHeight / 16);
  }, []);
  const profileImage = `${process.env.REACT_APP_API_URL}/${image}`;
  const followUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/follow/${username}`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        myUsername:Cookies.get("username")
      })
    })
    const data = await res.json();
    if(res.status === 200){
      console.log(data)
    }
  }
  const unFollowUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/unfollow/${username}`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        myUsername:Cookies.get("username")
      })
    })
    const data = await res.json();
    if(res.status === 200){
      console.log(data)
    }
  }
  socket.on("new_followers_Array",(new_followers_Array)=>{
    setFollowers(new_followers_Array.length);
    setFollowersArray(new_followers_Array);
  })
  return (
    <div className="md:flex md:justify-center md:ml-[72px] xl:ml-[220px] bg-[#121212]">
      <div className="md:mx-5 md:max-w-[935px]">
        {!showPostsdiv ? (
          <>
            <div
              style={
                tabSize
                  ? { height: `${height + 8.875}rem`, minHeight: "15rem" }
                  : { height: `${height + 9.875}rem` }
              }
              className={`text-white border-b border-gray-600 mt-12 grid overflow-hidden md:w-[80vw] xl:w-[935px]`}
            >
              <div
                style={
                  tabSize
                    ? { height: `${height + 8.875}rem`, minHeight: "15rem" }
                    : { height: `${height + 8.875}rem` }
                }
                className={`grid grid-cols-6 md:content-center`}
              >
                {/* height:`${height+5}rem` */}
                <div
                  style={tabSize ? {} : {}}
                  className="ml-2 col-span-2 md:row-span-2 flex justify-center items-center h-20 mt-2 mx-2 md:h-full"
                >
                  <img
                    onError={(e) => (e.currentTarget.src = userProfileImage)}
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt="profile"
                    className="object-cover rounded-full w-20 h-20 md:w-44 md:h-44"
                  />
                </div>
                <div className="flex items-center justify-evenly col-span-4 md:row-span-1 h-20 mt-2 ml-1 md:h-8 md:justify-start md:max-w-[613px] md:ml-[28.8vw] md:mt-5 md:pt-[68px] md:absolute md:flex-row lg:ml-[19rem] xl:ml-[19.5rem]">
                  <div className="md:flex md:flex-row mr-3">
                    <p className="font-[650] md:mr-1">{posts.length}</p>
                    <p className="font-medium">Posts</p>
                  </div>
                  <div className="md:flex mr-3">
                    <p className="font-[650] md:mr-1">{followers}</p>
                    <p className="font-medium">Followers</p>
                  </div>
                  <div className="md:flex mr-3">
                    <p className="font-[650] md:mr-1">{following}</p>
                    <p className="font-medium">Following</p>
                  </div>
                </div>
                <div
                  ref={elementRef}
                  className="flex flex-col justify-start col-span-6 md:col-span-4 md:row-span-1 mb-20 md:h-auto md:max-w-[613px] md:ml-4 md:mb-0 md:mt-24 lg:ml-6 xl:ml-0"
                >
                  <p className="text-lg font-bold">{profileName}</p>
                  <p className="text-md min-h-[2rem] md:min-h-[initial]">
                    {description}
                  </p>
                </div>
              </div>
              <div className="h-8 md:flex md:justify-start items-center md:h-12 md:absolute md:font-semibold md:text-lg md:mt-4 md:max-w-[613px]">
                <div
                  className="flex justify-evenly fixed py-[0.75rem] w-[100vw] top-0 z-10 border-b border-black md:border-none md:block md:py-0 md:z-0 md:w-auto md:static md:items-center md:flex-row md:justify-start md:max-w-[613px] md:ml-[28.8vw] lg:ml-[19rem] xl:ml-[19.5rem]"
                  // className="flex justify-evenly bg-green-200 py-[0.75rem] w-[100vw] z-10 border-b border-black absolute top-0" try this for mobile devices
                >
                  <Link to="/" className="md:hidden">
                    <LeftArrowIcon/>
                  </Link>
                  <p className="md:text-2xl">{username}</p>{" "}
                  {/* not more than 17 characters design problems might occur */}
                  <Link
                    to="/edit-profile"
                    style={
                      theirusername === undefined || theirusername === null
                        ? {}
                        : { display: "none" }
                    }
                    className="md:hidden"
                  >
                    edit Profile
                  </Link>
                </div>
                {theirusername === undefined || theirusername === null ? (
                  <div className="grid grid-cols-8 -translate-y-4 md:translate-y-0 md:flex md:justify-end">
                    <button onClick={()=>{navigate("/edit-profile")}} className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium xl:w-40">
                      Edit Profile
                    </button>
                    <button onClick={()=>{alert("DELETE ACCOUNT feature will be added soon")}} className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium xl:w-40">
                      Delete Account
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-9 -translate-y-4 md:translate-y-0 md:flex md:justify-end">
                    {followersArray.some(
                      (obj) => obj.username === Cookies.get("username")
                    ) ? (
                      <button onClick={()=>{unFollowUser();socket.emit("unfollow_theirProfile",Cookies.get("username"))}} className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium">
                        Following
                      </button>
                    ) : (
                      <button onClick={()=>{followUser();socket.emit("follow_theirProfile",Cookies.get("username"))}} className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium">
                        Follow
                      </button>
                    )}

                    <button onClick={()=>{navigate(`/messages/${theirProfileId}`)}} className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium">
                      Message
                    </button>
                    <button className="col-span-1 border border-transparent mx-1 rounded bg-gray-500 text-center font-medium md:hidden">
                      🤝
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/*top-12,sticky & -weebkit-sticky helps to get position sticky after 3rem from the top of the screen like instagram*/}
            {/* <div
              style={{ position: "-webkit-sticky" }}
              className="flex justify-around md:px-44 border-black border-b sticky h-8 top-12 bg-yellow-300 md:border-t md:border-b-0 md:static"
            >
              <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px] md:focus:border-t-2 md:focus:border-b-0">
                Posts
              </button>
              <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px] md:focus:border-t-2 md:focus:border-b-0">
                Reels
              </button>
              <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px] md:focus:border-t-2 md:focus:border-b-0">
                Tags
              </button>
            </div> */}
            <div className="flex justify-start items-center flex-row flex-wrap md:justify-around md:gap-4 md:mt-4 margin-break:mx-2 mb-12">
              <UserPosts
                height={height}
                profileImage={profileImage}
                posts={posts}
                setShowPostsdiv={setShowPostsdiv}
                setScrollTo={setScrollTo}
              />
            </div>
          </>
        ) : (
          <div>
            <div className="sticky top-0 h-12 w-full text-white text-xl font-semibold flex flex-row justify-between items-center bg-[#252525] rounded-b-md border-b border-x border-[#555555]">
              <p
                onClick={() => {
                  setShowPostsdiv(false);
                }}
                className="ml-2 cursor-pointer"
              >
                <LeftArrowIcon />
              </p>
              <p className="mr-2">Posts</p>
            </div>
            <div className="sticky bottom-0 top-[calc(100vh-5rem)] w-full text-white text-xl font-semibold flex justify-end items-center">
              <div
                onClick={() => {
                  setShowPostsdiv(false);
                }}
                className="rounded-full bg-[#67d7ff52] h-8 w-8 grid place-items-center mr-2 mb-2 cursor-pointer"
              >
                <LeftArrowIcon />
              </div>
            </div>
            <Postsdiv
              allPostsState={posts}
              setAllPostsState={setPosts}
              scrollTo={scrollTo}
              socket={socket}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

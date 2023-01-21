import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import dummyUserImage from "../assets/user.png";

const Search = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [profileData, setProfileData] = React.useState([]);
  const fetchUsers = async (parameter) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/allusers/${parameter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setProfileData(data.usersArray);
      console.log(profileData);
    }
  };
  return (
    <>
      <div className="w-full md:w-[calc(100%-72px)] md:ml-[72px] xl:w-[calc(100%-220px)] h-screen xl:ml-[220px] bg-[#121212]">
        <div className="flex justify-center items-center bg-black h-20 md:border-l md:border-yellow-100 md:rounded-b-md">
          <input
          type="text"
            placeholder="Search for your friends"
            rows="1"
            onChange={(e) => {
              if (e.currentTarget.value === "") {
                return;
              }else{
              fetchUsers(e.currentTarget.value);
            }}}
            className="resize-none w-[calc(100%-6rem)] pl-3 focus:outline-none caret-white bg-[#121212] text-white rounded-md h-8 text-lg"
          />
        </div>
        <div className="grid justify-center items-center bg-[#121212]">
          {profileData.map((singleUser) => (
            <div key={singleUser._id} onClick={()=>{navigate(`/user/${singleUser.username}`)}} className="m-2 rounded-md flex bg-black">
              <div className="w-24 h-24 grid place-items-center">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${singleUser?.profileImage?.imgUrl}`}
                  onError={(e)=>{e.currentTarget.src=`${dummyUserImage}`}}
                  alt=""
                  className="object-cover w-20 h-20 rounded-full border border-yellow-100"
                />
              </div>
              <div className="h-24 grid content-center mx-1">
                <p className="text-white font-bold">{singleUser.username}</p>
                <p className="text-white font-medium">{singleUser.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;

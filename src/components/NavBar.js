import React,{useState} from "react";
import { Link } from "react-router-dom";
import {HomeIcon,SearchIcon,CreateIcon,MessageIcon} from "../assets/Icons.js";
import userProfileImage from "../assets/user.png";

const Navbar = ({create,setCreate}) => {
  return (
    <nav className="bg-black text-white h-10 w-full flex justify-around items-center fixed bottom-0 z-30 md:w-[72px] xl:w-[220px] md:h-full md:left-0 md:flex-col md:justify-start gap-y-16 xl:items-start">
      <div className="md:mt-12 xl:ml-4">
        <Link to="/"><div className="flex justify-center"><HomeIcon/><span className="hidden xl:block ml-6 text-lg">Home</span></div></Link>
      </div>
      <div className="xl:ml-4">
        <Link to="/search"><div className="flex justify-center"><SearchIcon/><span className="hidden xl:block ml-6 text-lg">Search</span></div></Link>
      </div>
      <div className="xl:ml-4">
        <div onClick={()=>{setCreate(true)}}><div className="flex justify-center cursor-pointer"><CreateIcon/><span className="hidden xl:block ml-6 text-lg">Create</span></div></div>
      </div>
      <div className="xl:ml-4">
        <Link to="/messages"><div className="flex justify-center"><MessageIcon/><span className="hidden xl:block ml-6 text-lg">Messages</span></div></Link>
      </div>
      <div className="xl:ml-4">
        <Link to="/profile"><div className="flex justify-center"><img src={userProfileImage} alt="profile" className="h-8 w-8" /><span className="hidden xl:block ml-6 text-lg">Profile</span></div></Link>
      </div>
    </nav>
  );
};


export default Navbar;
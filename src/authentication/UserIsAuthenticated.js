import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {giveAccess} from "../slices/userSlice.js";
import { useState } from "react";

const UserIsAuthenticated = ({ children }) => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  const [wait,setWait] = useState(true)
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const fetchUser = async ()=>{
    const res = await fetch(`${process.env.REACT_APP_API_URL}/authentication`, {//ipV4 instead of localhost for mobile testing
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.status === 401){
      setWait(false)
    }
    if(res.status === 200){
    const response = await res.json();
      dispatch(giveAccess(response.data)) // response.data will give us req.user
      setWait(false)
      // console.log("checking")
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (<>
  {wait?"Loading...":
  user.isAuthenticated?<Navigate to='/' replace={true}/>:children
  }
  </>);
};

export default UserIsAuthenticated;
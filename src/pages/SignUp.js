import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { OpenEyeIcon,CloseEyeIcon } from "../assets/Icons.js";
import Logo from "../assets/picfont_im_d3_im.png";

const SignUp = () => {
    const navigate = useNavigate();
  const [revealPswd, setRevealPswd] = React.useState(false);
  const Initialform = {
    name:"",
    username:"",
    email:"",
    password:""
  }
  const [formdata,setFormdata] = React.useState(Initialform);
  const editForm = (e)=>{
    e.preventDefault();
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register`,{
        method:"POST",
        body:JSON.stringify(formdata),
        headers:{
            "content-type":"application/json",
        }
    })
    if(res.ok){
        navigate("/login")
    }
  }

  return (
    <><div className="bg-white overflow-x-hidden flex justify-center items-center">
      <div className="flex justify-center items-center min-h-screen w-[320px] md:w-auto max-w-[100vw] flex-col">
        <div className="w-[300px] md:w-[21.75rem] h-[32rem] flex justify-center items-center flex-col border border-black md:mt-12">
          <img src={Logo} alt="" className=" mb-4"/>
          <p className="mb-4 text-lg font-bold w-60 text-center">Sign up to see photos from your friends.</p>
          <form className="grid" onSubmit={(e)=>{formSubmit(e)}}>
            <div className="box my-1">
              <input
                className="appearance-none border-[0.5px] rounded-sm text-sm w-full py-2 pr-7 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                type="text"
                name="name"
                id="name"
                value={formdata.name}
                onChange={(e)=>{editForm(e)}}
                placeholder="Full Name"
              />
            </div>
            <div className="box my-1">
              <input
                className="appearance-none border-[0.5px] rounded-sm text-sm w-full py-2 pr-7 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                type="name"
                name="username"
                id="username"
                value={formdata.username}
                onChange={(e)=>{editForm(e)}}
                placeholder="Username"
              />
            </div>
            <div className="box my-1">
              <input
                type="email"
                name="email"
                id="email"
                value={formdata.email}
                onChange={(e)=>{editForm(e)}}
                className="appearance-none border-[0.5px] rounded-sm text-sm w-full py-2 pr-7 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                placeholder="Email"
              />
            </div>
            <div className="box my-1">
              <input
                className="appearance-none border-[0.5px] rounded-sm text-sm w-full py-2 pr-7 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                type={revealPswd ? "text" : "password"}
                name="password"
                id="password"
                value={`${formdata.password}`}
                onChange={(e)=>{editForm(e)}}
                placeholder="Password"
              />
              <div className="w-full bg-transparent flex justify-end items-center -mt-[30px] -ml-[2px]">{revealPswd ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRevealPswd(false);
                  }}
                >
                  <OpenEyeIcon/>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRevealPswd(true);
                  }}
                >
                  <CloseEyeIcon/>
                </button>
              )}</div>
            </div>
            <p className="mt-2 w-60 text-xs text-center">People who use our service may have uploaded your contact information to Imagegram. Copied from IG</p>
            <p className="mt-2 w-60 text-xs text-center">By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
            <button className="button bg-sky-400 mt-4 rounded active:bg-sky-600 active:text-gray-50 " htmlFor="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex w-[300px] md:w-[21.75rem] border border-black mt-4 h-20 md:mb-12 justify-center items-center">
          <div>Already have an account?<Link className="text-blue-600 underline" to="/login">Log in</Link></div>
        </div>
      </div></div>
    </>
  );
};

export default SignUp;

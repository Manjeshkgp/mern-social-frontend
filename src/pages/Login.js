import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { giveAccess } from "../slices/userSlice";
import { OpenEyeIcon,CloseEyeIcon } from "../assets/Icons.js";
import Logo from "../assets/picfont_im_d3_im.png";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [revealPswd, setRevealPswd] = React.useState(false);
  const Initialform = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = React.useState(Initialform);
  const editForm = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      const { token, user } = await res.json();
      Cookies.set("token", token);
      Cookies.set("identification",user._id)
      Cookies.set("username",user.username)
      dispatch(giveAccess(user));
      navigate("/");
      console.log(user);
    }
  };

  return (
    <><div className=" overflow-x-hidden bg-white flex justify-center items-center">
    <div className="flex justify-center items-center min-h-screen w-[320px] md:w-auto max-w-[100vw] flex-col">
      <div className="w-[300px] md:w-[21.75rem] h-[26rem] flex justify-center items-center flex-col border border-black md:mt-12">
        <img src={Logo} alt="" className=" mb-4"/>
        <form className="grid" onSubmit={(e)=>{formSubmit(e)}}>
          <div className="box my-1">
            <input
              type="email"
              name="email"
              id="email"
              value={formdata.email}
              onChange={(e)=>{editForm(e)}}
              className="border-black appearance-none border-[0.5px] rounded-sm text-sm w-full py-2 pr-7 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="box my-1">
            <input
              className="border-black appearance-none border-[0.5px] rounded-sm text-sm w-full py-2 pr-7 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <p className="mt-2 w-60 text-xs text-center">By logging in, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
          <button className="button bg-sky-400 mt-4 rounded active:bg-sky-600 active:text-gray-50" htmlFor="submit">
            Login
          </button>
        </form>
      </div>
      <div className="flex w-[300px] md:w-[21.75rem] border border-black mt-4 h-20 md:mb-12 justify-center items-center">
        <div>Doesn't have account?<Link className="text-blue-600 underline" to="/signup">Sign Up</Link></div>
      </div>
    </div></div>
  </>
  );
};

export default Login;

import Cookies from "js-cookie";
import React from "react";
import { PhotosIcon, CloseIcon } from "../assets/Icons";
import userDummyImage from "../assets/user.png";

const Postpost = ({setCreate,setSuccess}) => {
  const username = Cookies.get("username");
  const identification = Cookies.get("identification");
  const token = Cookies.get("token");
  const [file, setFile] = React.useState(null);
  const [textValue, setTextValue] = React.useState("");
  const textRef = React.useRef(null);
  const parentRef1 = React.useRef(null);
  const parentRef2 = React.useRef(null);
  const [previewImg, setPreviewImg] = React.useState("");
  const [clickedOutside, setClickedOutside] = React.useState(false);

  async function handleImageChange(e) {
    setFile(e.target.files[0]);
  }

  const previewProcess = async () => {
    if (file != null) {
      //   const requiredBlob = await file.blob();
      const previewImgUrl = URL.createObjectURL(file);
      setPreviewImg(previewImgUrl);
      console.log(previewImgUrl);
      if(clickedOutside===true){
        URL.revokeObjectURL(previewImgUrl);
      }
    }
    return;
  };
  const sendPost = async () => {
    const formdata = new FormData();
    formdata.append("postImage", file);
    formdata.append("description", textValue);
    formdata.append("contentType", "image/png");
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/post/${identification}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          enctype: "multipart/form-data; boundary=???",
        },
        body: formdata,
      }
    );
    const data = await res.json();
    if(res.status===200){setSuccess(true)}
    setClickedOutside(true); // herebthis is added just to close the Postpost component
      setCreate(false)
    console.log(data);
  };
  const handlePost = () => {
    setTextValue(textRef.current?.value);
    sendPost();
  };
  React.useEffect(() => {
    previewProcess();
  }, [file]);

  const handleClickOutside = (e) => {
    if(parentRef1.current?.contains(e.target)||parentRef2.current?.contains(e.target)){
      setClickedOutside(false)
    }
    else if (!parentRef1.current?.contains(e.target)) {
      setClickedOutside(true);
      setCreate(false)
    }
    else if(file!=null & !parentRef2.current?.contains(e.target)){
      setClickedOutside(true);
      setCreate(false)
    }
  };

  const handleClickInside = () => setClickedOutside(false);
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // console.log("clickOutside",clickedOutside);
  return (
    <>
      {!clickedOutside ? (
        <div className="fixed w-full h-screen bg-black-rgba z-60 flex flex-col justify-center items-center left-0 top-0 bottom-0 right-0">
          <div className="absolute top-2 cursor-pointer right-2">
            <CloseIcon />
          </div>
          {file === null ? (
            <div
              ref={parentRef1}
              onClick={handleClickInside}
              className="w-full md:w-96 h-[calc(100vh-5rem)] md:h-[30rem] flex justify-start items-center flex-col bg-[#262626] rounded-md"
            >
              <p className="text-lg font-semibold text-white border-b-[0.5px] border-white w-full text-center">
                Create New Post
              </p>
              <div className="h-[calc(100vh-10rem)] mt-4 md:h-[26rem] flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-white">
                  Drag a Photo here
                </p>
                <PhotosIcon />
                <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={(e) => handleImageChange(e)}
                    className="hidden"
                  />
                  <label
                    htmlFor="upload"
                    className="text-sm font-medium px-2 bg-[#0095f6] rounded-md cursor-pointer text-white"
                  >
                    Select file
                  </label>
                </form>
              </div>
            </div>
          ) : (
            <div ref={parentRef2} className="w-full md:w-[600px] h-[calc(100vh-5rem)] md:h-[30rem] flex justify-start items-center flex-col bg-[#262626] rounded-md">
              <p className="text-lg font-semibold text-white border-b-[0.5px] border-white w-full text-center">
                Create New Post
              </p>
              <div className="h-36 w-full mt-4 flex flex-row justify-around content-center md:h-[480px] md:grid md:grid-flow-col md:grid-cols-5 md:grid-rows-6 md:mb-0">
                <div className="mb-[calc(90vh-14rem)] md:row-span-1 md:col-span-2 md:mb-0 md:w-full md:h-full md:flex md:justify-evenly md:items-center">
                  <img
                    src={`${userDummyImage}`}
                    alt=""
                    className="h-16 w-16 object-cover"
                  />
                  <p className="hidden md:block text-center text-white text-lg font-medium">
                    {username}
                  </p>
                </div>
                <div className="mb-[calc(90vh-18rem)] md:mb-0 md:col-span-2 md:row-span-5 md:h-full md:w-full md:flex md:justify-center md:items-center">
                  <textarea
                    onChange={()=>{setTextValue(textRef.current.value)}} // check this with db surely
                    ref={textRef}
                    placeholder="Write a caption..."
                    className="focus:outline-0 w-52 h-32 text-start pt-0 pl-0 text-sm overflow-y-scroll md:overflow-auto resize-none caret-white text-gray-50 bg-black md:h-[calc(100%-1rem)] md:w-[calc(100%-1rem)] md:bg-[#262626]"
                  />
                </div>
                <div className="mb-[calc(90vh-14rem)] md:mb-0 md:col-span-3 md:row-span-6 md:h-full md:w-full md:flex md:justify-center md:items-center">
                  <img
                    src={`${previewImg}`}
                    alt=""
                    className="h-16 w-16 object-cover md:h-[calc(100%-1rem)] md:w-[calc(100%-1rem)]"
                  />
                </div>
              </div>
              <div className="h-8 w-full grid place-items-center">
                <button
                  onClick={() => {
                    handlePost();
                  }}
                  className="text-sm font-medium px-2 bg-[#0095f6] rounded-sm text-center cursor-pointer text-white"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default Postpost;

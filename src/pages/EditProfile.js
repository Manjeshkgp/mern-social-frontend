import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import dummyUserImage from "../assets/user.png"

const EditProfile = () => {
  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [description, setDescription] = useState("");
  const [oldImage,setOldImage] = useState("");
  const identification = Cookies.get("identification");
  const token = Cookies.get("token");
  const fetchProfile = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${identification}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "image/png",
      },
    });
    const data = await res.json();
    setDescription(data.description);
    // setOldImage(`process.env.REACT_APP_API_URL/${data.image}`)
    console.log(data)
  };
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleTextChange = (e) => {
    setDescription(e.target.value);
  };
  const updateProfile = async () => {
    const formdata = new FormData();
    formdata.append("profileImage", file);
    formdata.append("description", description); //getting multerError unexpected field, might be because of this description
    formdata.append("contentType", "image/png");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${identification}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        enctype: "multipart/form-data; boundary=???",
      },
      body: formdata,
    });
    const data = await res.json();
    if (res.status === 200) {
      console.log("Response 200");
    }
    console.log(data);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const previewProcess = async () => {
    if (file != null) {
      const previewImgUrl = URL.createObjectURL(file);
      setPreviewImg(previewImgUrl);
      console.log(previewImgUrl);
    }
    return;
  };
  useEffect(() => {
    previewProcess();
  }, [file]);
  return (
    <>
      <div className="bg-[#121212] h-[calc(100vh-2rem)] md:h-[100vh] w-full md:ml-[72px] md:w-[calc(100%-72px)] xl:ml-[220px] xl:w-[calc(100%-220px)] flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (file === null) {
              alert("Choosing an Image is necessary");
            } else {
              updateProfile();
              URL.revokeObjectURL(previewImg);
              setFile(null);
              setDescription("");
            }
          }}
          className="flex flex-col gap-6"
        >
          {file !== null ? (
            <img src={`${previewImg}`} alt="" className="h-40" />
          ) : (""
            // <img src={`${oldImage}`} onError={(e)=>{e.currentTarget.src=dummyUserImage}} alt="" className="h-40"/>
          )}
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            onChange={(e) => {
              handleImageChange(e);
            }}
            className="hidden"
          />
          <label
            htmlFor="profileImage"
            className="text-sm font-medium px-2 bg-[#0095f6] rounded-md cursor-pointer text-white text-center"
          >
            Select Image
          </label>
          <textarea
            type="text"
            placeholder="Write your description..."
            value={description}
            onChange={(e) => handleTextChange(e)}
            className="focus:outline-0 min-w-[12rem] resize text-start pt-0 pl-0 text-sm caret-white text-gray-50 bg-black md:bg-[#262626]"
          />
          <button
            htmlFor="submit"
            className="text-sm font-medium px-2 bg-[#0095f6] rounded-sm text-center cursor-pointer text-white"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;

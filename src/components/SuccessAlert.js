import React,{useEffect, useRef} from "react";

const SuccessAlert = ({setSuccess}) => {
    const alertRef = useRef(null);
    useEffect(()=>{
    const timer = setTimeout(() => {
        const theRef = alertRef.current;
        theRef.className = "absolute top-16 remove-alert w-full grid place-items-center";
    }, 1200);
    const timer2 = setTimeout(() => {
        setSuccess(false);
    }, 2000);
        return()=>{ clearTimeout(timer);clearTimeout(timer2);}
    },[])
  return (
    <div ref={alertRef} className="absolute top-16 alert-toast w-full grid place-items-center">
    <div
      className="text-sm flex justify-center items-center text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium p-2">Amazing!</span><p className="py-2 pr-2">your Post is shared on the Website</p>
    </div></div>
  );
};

export default SuccessAlert;

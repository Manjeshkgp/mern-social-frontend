import React from "react";

const ErrorPage = () => {
  return (
    <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
      <p className="text-[8rem] md:text-[12rem] text-center">🤦🏻‍♀️🤦🏻</p>
      <p className="text-white text-lg font-semibold text-center">
        Whoops, I think you've entered into a wrong URL
      </p>
      <p className="text-white text-[4rem] font-semibold text-center">
        404
      </p>
    </div>
  );
};

export default ErrorPage;

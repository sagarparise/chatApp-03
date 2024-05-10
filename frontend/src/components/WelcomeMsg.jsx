import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
function WelcomeMsg() {
  const { authUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="drawer w-full h-full relative flex  justify-center items-center bg-[#f2e9e4]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div class="drawer-content flex flex-col items-center justify-center">
          
          <div className=" drawer w-full h-[55px] absolute top-0 bg-black flex justify-between items-center px-5 text-2xl">
            <label
              htmlFor="my-drawer-2"
              class=" bx bx-menu text-white sm:hidden drawer-button"
            >
           
            </label>
            <h1 className=" text-white font-mono ">Chat App</h1>
            <i className="bx bx-dots-vertical-rounded text-white"></i>
          </div>

          <div className=" card border-2 shadow-lg bg-inherit p-5 flex items-center justify-center flex-col gap-2 mt-3">
            <h1 className="text-2xl font-bold text-black text-center">
              {`Hii 👋 ${authUser?.fullName}`}
            </h1>
            <p className=" font-semibold text-xl">
              Select a chat to start messaging
            </p>
            <i className="bx bx-message-rounded-dots text-4xl"></i>
          </div>
        </div>

        <div class="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className=" h-full w-[270px] bg-white">
          <Sidebar />
          </div>
        </div>
      </div>
      
    </>
  );
}

export default WelcomeMsg;

{
  /* <div className=" drawer w-full h-[55px] absolute top-0 bg-black flex justify-between items-center px-5 text-2xl">
  
<i className="bx bx-menu text-white sm:hidden"></i>
<h1 className=" text-white font-mono ">Chat App</h1>
<i className="bx bx-dots-vertical-rounded text-white"></i>
      
</div>

<div className=" card border-2 shadow-lg bg-inherit p-5 flex items-center justify-center flex-col gap-2 mt-3">
<h1 className="text-2xl font-bold text-black text-center">
  {`Hii 👋 ${authUser?.fullName}`}
</h1>
<p className=" font-semibold text-xl">
  Select a chat to start messaging
</p>
<i className="bx bx-message-rounded-dots text-4xl"></i>
</div> */
}

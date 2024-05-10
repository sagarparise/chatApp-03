import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Slices/messageSlice";
import { setSelectedUsers } from "../Slices/userSlice";
import WelcomeMsg from "./WelcomeMsg";
import Sidebar from "./Sidebar";
function MessageContainer() {
  const { selectedUsers } = useSelector((state) => state.user);

  return (
    <>
      {selectedUsers ? (
        <div className="h-screen flex flex-col">
          <MessageHeader />
          <MessageBox />
          <SendInput />
        </div>
      ) : (
        <WelcomeMsg />
      )}
    </>
  );
}

export default MessageContainer;

const MessageHeader = () => {
  const { selectedUsers, getOnlineUsers } = useSelector((state) => state.user);
  const isOnline = getOnlineUsers.includes(selectedUsers._id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  window.addEventListener('click', (e)=>{
    if (!e.target.closest(".sidebar") && e.target.tagName !== 'I') {
      setIsDrawerOpen(false);
    }
   
  })

  return (
    <div className="h-[55px] px-3 py-1 pr-6 flex justify-between items-center bg-zinc-600">
      <div className="flex gap-1 items-center">
        <i
          className="bx bx-menu text-2xl text-white sm:hidden cursor-pointer"
          onClick={toggleDrawer}
        ></i>
        <div className="px-2 py-1 flex items-center gap-2">
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-10 rounded-full">
              <img src={`${selectedUsers?.profilePic}`} alt="Profile" />
            </div>
          </div>
          <span className="text-white text-lg font-serif whitespace-nowrap">
            {selectedUsers.fullName}
          </span>
        </div>
      </div>

      <div className="text-white flex items-center gap-2 sm:gap-5 text-xl hover:cursor-pointer">
        <i className="bx bxs-phone-call p-1 rounded-full hover:bg-slate-500"></i>
        <i className="bx bxs-video p-1 rounded-full hover:bg-slate-500"></i>
        <i className="bx bx-dots-vertical-rounded p-1 rounded-full hover:bg-slate-500"></i>
      </div>

      {/* Drawer content */}
      {isDrawerOpen && (
        <div className="fixed main-drawer inset-0 w-screen h-full bg-black bg-opacity-50 z-50">
          <div className="absolute sidebar top-0 left-0 bg-white h-full w-70 shadow">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

const SendInput = () => {
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const handleSendInput = async () => {
    if (!selectedUsers) return;
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token);
      const res = await fetch(
        `http://localhost:5000/api/messages/send/${selectedUsers?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          withCredentials: true,
          body: JSON.stringify({
            message: inputVal,
          }),
        }
      );
      const data = await res.json();
      dispatch(setMessages([...messages, data.newMessage]));
      setInputVal("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex px-2 py-1 justify-between items-center gap-5 pr-6 flex-nowrap">
      <input
        type="text"
        placeholder="Type here"
        className="h-[40px] input flex-1"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <i
        className="bx bxs-send text-2xl border px-2 py-1 rounded-full cursor-pointer hover:bg-slate-400 hover:text-white"
        onClick={handleSendInput}
      ></i>
    </div>
  );
};

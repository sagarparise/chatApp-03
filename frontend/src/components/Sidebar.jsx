import React, { useState } from "react";
import useGetotherUsers from "../hooks/useGetotherUsers";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUsers,
} from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { getEmoji } from "../utils/getEmoji";

function Sidebar() {
  const navigate = useNavigate();
  useGetotherUsers();
  const { otherUsers, authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  if (!otherUsers) return;

  const logoutHandle = async () => {
    try {
      const res = await fetch("https://chatapp-03-yt.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await res.json();
      if (data.status >= 400) throw new Error(data.message);
      localStorage.removeItem("token");
      toast.success(`${data.message}`, {
        position: "top-right",
      });

      navigate("/login");
      dispatch(setSelectedUsers(null));
      dispatch(setOtherUsers(null));
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error.message);
      toast.error(`${error.message}`, {
        position: "top-right",
      });
    }
  };

  const filterUsers = otherUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className=" w-full h-full flex flex-col gap-2 ">
      <div className=" h-[55px] px-3 py-3 shadow-sm flex items-center justify-between border-b">
        <div className=" flex items-center gap-2">
          <i className="bx bx-chat bx-tada-hover text-[#32d8ef] text-4xl"></i>
          <h1 className=" text-2xl font-semibold font-mono">Chat</h1>
        </div>
      </div>

      <div className="input input-bordered flex items-center gap-2 mx-3 h-[35px]">
        <input
          type="text"
          className="grow"
          value={searchVal}
          placeholder="Search"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <ul className=" w-full p-3 flex-1 flex flex-col gap-2 overflow-y-scroll ">
        {filterUsers &&
          filterUsers.map((user) => (
            <OtherUser key={user._id} user={user} emoji={getEmoji()} />
          ))}
      </ul>

      <div className=" h-[50px] px-3 py-3 shadow-inner flex items-center justify-between border-t dropdown dropdown-right dropdown-top">
        <div className="tooltip tooltip-right tooltip-info" data-tip="Logout">
          <i
            className="bx bx-log-out text-2xl cursor-pointer "
            onClick={logoutHandle}
          ></i>
        </div>

        <div className="avatar cursor-pointer" tabIndex={0} role="button">
          <div className="w-10 rounded-full">
            <img src={`${authUser?.profilePic}`} />
          </div>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100  border rounded-box w-[250px] h-[250px] flex justify-center items-center"
        >
          <div className=" text-center">
            <div className="avatar cursor-pointer">
              <div className="w-[80px] rounded-full">
                <img src={`${authUser?.profilePic}`} />
              </div>
            </div>
            <h2 className=" text-lg font-serif font-semibold mt-3">
              {authUser?.fullName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

export const OtherUser = ({ user, emoji }) => {
  const dispatch = useDispatch();
  const { selectedUsers, getOnlineUsers } = useSelector((state) => state.user);
  const isOnline = getOnlineUsers && getOnlineUsers.includes(user._id);
  const selecetedUserHandle = () => {
    dispatch(setSelectedUsers(user));
  };
  return (
    <li
      className={`px-2 py-1 pr-4 flex items-center justify-between gap-2 border-b-2 hover:rounded-lg hover:bg-slate-300 cursor-pointer ${
        user._id === selectedUsers?._id ? "bg-slate-300 rounded-lg" : ""
      }`}
      onClick={selecetedUserHandle}
    >
      <div className=" flex items-center gap-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={`${user?.profilePic}`} />
          </div>
        </div>
        <span className="text-black text-lg font-serif">{user.fullName}</span>
      </div>
      <span className=" text-2xl">{emoji}</span>
    </li>
  );
};

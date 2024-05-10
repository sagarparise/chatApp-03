import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client'
import { setSocket } from "./Slices/socketSlice";
import { setOnlineUsers } from "./Slices/userSlice";
function App() {
 const{authUser} = useSelector(state=> state.user);
 const{ socket} = useSelector(state=> state.socket);
 const dispatch = useDispatch()
 const token = localStorage.getItem('token');

 useEffect(()=>{
   if(authUser){
   const socket = io('https://chatapp-03-yt.onrender.com/',{
     query: {
       userId: authUser.id
     }
   })
  
  dispatch(setSocket(socket));
   socket.on('getOnlineUser', (onlineUsers)=>{
    dispatch(setOnlineUsers(onlineUsers));
   });
    return ()=> socket.close();
  }
  else{
    if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }
 },[authUser])

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <HomePage/> : <Navigate to='/signup'/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

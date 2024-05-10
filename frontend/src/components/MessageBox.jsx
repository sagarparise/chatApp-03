import React, { useEffect, useRef } from "react";
import useGetMessage from "../hooks/useGetMessage";
import { useSelector } from "react-redux";
import exactTime from "../utils/exactTime";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

function MessageBox() {
 useGetMessage();
 useGetRealTimeMessage();
 const{messages} = useSelector(state=> state.message);
//console.log(Array.from(messages))

  return (
    <div className="flex-1 p-3 bg-slate-300 overflow-y-scroll">    
      
      {
        messages && Array.from(messages).map((message,i)=>(
          <Message key={i} message={message}/>
        ))
      }
     
    </div>
  );
}

export default MessageBox;

const Message = ({message}) => {
  const{authUser, selectedUsers} = useSelector(state=> state.user);
 const chatBubble = authUser?.id === message?.senderId ? "chat-end " : "chat-start";
 const chatBubbleColor = authUser?.id === message?.senderId ? "chat-bubble-info text-white" : "";

//  console.log(chatBubble)

  const scroll = useRef();

  useEffect(()=>{
    scroll.current.scrollIntoView({behavior:'smooth'})
  },[message])
  return (
    <>
      <div ref={scroll} className={`chat ${chatBubble}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={`${authUser?.id === message?.senderId ? authUser?.profilePic : selectedUsers?.profilePic}`}
            />
          </div>
        </div>
        <div className={`chat-bubble ${chatBubbleColor}`}>{message?.message}</div>
        <div className="chat-footer opacity-50">{exactTime(message.createdAt)}</div>
      </div>
    </>
  );
};

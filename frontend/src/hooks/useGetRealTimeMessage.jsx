import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setMessages } from '../Slices/messageSlice';
import soundNotification from '../assets/notification.mp3'

function useGetRealTimeMessage() {
  const dispatch = useDispatch();
 const{socket} = useSelector(state => state.socket)
 const{messages} = useSelector(state => state.message)

 console.log(socket)

  useEffect(()=>{
    socket?.on('newMessage',(newMessage)=>{
      console.log(newMessage)
      const sound = new Audio(soundNotification)
      sound.play()
        dispatch( setMessages([...messages, newMessage]))
    })
  },[socket, setMessages, messages])
}

export default useGetRealTimeMessage;
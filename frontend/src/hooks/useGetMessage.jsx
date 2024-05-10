import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../Slices/messageSlice';

function useGetMessage() {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.user);
  useEffect(()=>{
   
    const fetchMessage = async()=>{
      if(!selectedUsers) return;
      try {
        const token = JSON.parse(localStorage.getItem('token'));
     
        const res = await fetch(`http://localhost:5000/api/messages/${selectedUsers?._id}`,{
          method: 'GET',
          headers: {
            'authorization': token,
          },
          withCredentials: true,
        })
        const data = await res.json()
   
      dispatch(setMessages(data))
      
      } catch (error) {
        console.log(error);
      }
   }
    
 
      fetchMessage()
    
  },[selectedUsers])
}

export default useGetMessage
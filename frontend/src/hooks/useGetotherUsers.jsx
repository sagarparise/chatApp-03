import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../Slices/userSlice';
function useGetotherUsers() {
  const dispatch = useDispatch()
  useEffect(() =>{
    const fetchOtherUsers = async()=>{
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        
        const res = await fetch('https://chatapp-03-yt.onrender.com/api/users',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        }
      });
      const data = await res.json();
     
      dispatch(setOtherUsers(data.users))

      } catch (error) {
        console.log(error.message);
      }
    }
    fetchOtherUsers();
  },[]);
}

export default useGetotherUsers
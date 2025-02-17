import React from 'react'
import {BiMenu} from 'react-icons/bi'
import { useState , useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Tab = ({tab,setTab}) => {
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
  }
  return (
	<div>
    <span className='lg:hidden'><BiMenu className='w-6 h-6 cursor-pointer'/>
    </span>
    <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-md items-center h-max rounded-md mt-8'>
      <button className = {`${tab === 'overview' ? 'bg-indigo-100 text-blue-500' : 'bg-transparent text-black'} w-full btn mt-0  rounded-md `} onClick={() => setTab('overview')}>Overview</button>
      <button className = {`${tab === 'appointments' ? 'bg-indigo-100 text-blue-500' : 'bg-transparent text-black'} w-full btn mt-0  rounded-md `} onClick={() => setTab('appointments')}>Appointments</button>
      <button className = {`${tab === 'settings' ? 'bg-indigo-100 text-blue-500' : 'bg-transparent text-black'} w-full btn mt-0  rounded-md `} onClick={() => setTab('settings')}>Profile</button>
      <div className="mt-[100px] w-full md:mt-[100px]">
              <button
                className="w-full bg-[#181a1e] p-3 text-[16px] leading-7 text-white rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 text-white rounded-md">
                Delete account
              </button>
            </div>
    </div>
  </div>
  )
}

export default Tab
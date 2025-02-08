import React, { useState } from 'react'
import doctorImg from "../../assets/images/doctor-img02.png"
import startIcon from "../../assets/images/Star.png"
import DoctorAbout from './DoctorAbout'
import Feedback from './feedback'
import SidePannel from './SidePannel'
const DoctorDetails = () => {
  const [tab,setTab] = useState('about')
  return (
	<>
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-[50px] mt-4 px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-5">
            <figure className='max-w-[200px] max-h-[200px]'>
              <img src={doctorImg} alt="" />
            </figure>
            <div>
              <span className='bg-[#ccf0f3] text-sky-300 py-1px-6 lg:py-2 lg:px-6 leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>Surgeon</span>
              <h3 className='text-black text-[22px] leading-9 mt-3 font-bold'>
                Tusharkanta
              </h3>
              <div className="flex items-center gap-[6px] ">
                <span className='flex items-center gap-[6px] tetx-[14px] leading-5 lg:text-[16px]'>
                  <img src={startIcon} alt="" />4.8
                </span>
                <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-black'>
                  (272)
                </span>
              </div>
              <p className='text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo.</p>
            </div>
          </div>
          <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
            <button onClick={() =>setTab('about')} className={` ${tab === 'about' && 'border-b border-solid border-blue-500'}py-2 px-5 mr-5 text-[16px] leading-7 text-black font-semibold`}>About</button>
            <button onClick={() =>setTab('feedback')} className={`${tab === 'feedback' && 'border-b border-solid border-blue-500'} py-2 px-5 mr-5 text-[16px] leading-7 text-black font-semibold`}>Feedback</button>
          </div>
          <div className='mt-[50px]'>
            {
              tab === "about" && <DoctorAbout/>
            }
            {
              tab === "feedback" && <Feedback/>
            }
          </div>
        </div>
        <div>
            <SidePannel/>
        </div>
      </div>
    </div>
  </>
  )
}

export default DoctorDetails
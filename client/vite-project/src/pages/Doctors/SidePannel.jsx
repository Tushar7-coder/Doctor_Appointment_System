import React from "react";

const SidePannel = () => {
  return (
    <div className="shadow-2xl p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-black mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
          500 INR
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text-black mt-0 font-semibold ">Available time slots:</p>
        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className=",t-0 font-semibold text-black">Sunday</p>
            <p className="text-[15px] leading-6 text-black font-semibold">
              4:00 PM - 9:30 PM
            </p>
          </li>
		  <li className="flex items-center justify-between mb-2">
            <p className=",t-0 font-semibold text-black">Tuesday</p>
            <p className="text-[15px] leading-6 text-black font-semibold">
              4:00 PM - 9:30 PM
            </p>
          </li>
		  <li className="flex items-center justify-between mb-2">
            <p className=",t-0 font-semibold text-black">Wednesday</p>
            <p className="text-[15px] leading-6 text-black font-semibold">
              4:00 PM - 9:30 PM
            </p>
          </li>
        </ul>
      </div>
	  <button className="bg-blue-600 text-white px-2 py-2 w-full">Book Appointment</button>
    </div>
  );
};

export default SidePannel;

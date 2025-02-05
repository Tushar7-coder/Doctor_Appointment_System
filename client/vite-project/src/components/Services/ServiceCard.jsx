import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ServiceCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor } = item;

  return (
    <div className="py-[30px] px-3 lg:px-5">
      <h1 className="text-[26px] leading-9 text-black font-[700]">{name}</h1>
      <p className="text-[16px] leading-7 font-[400] text-black mt-4">{desc}</p>
      <div className="flex items-center justify-between mt-[30px]">
        <Link
          to="/doctors"
          className="w-[44px] h-[44px] rounded-full border border-solid border-black  flex items-center justify-center group hover:bg-blue-500 hover:border-none"
        >
          <FaArrowRight className="w-6 h-5 hover:text-white" />
        </Link>
		<span className="w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600] "
		style={{
			background : `${bgColor}`,
			color : `${textColor}`,
			borderRadius : "6px 0 0 6px"
		}}>
			{index + 1}
		</span>
      </div>
    </div>
  );
};

export default ServiceCard;

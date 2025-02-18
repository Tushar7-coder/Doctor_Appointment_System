import React from "react";
import formatData from "../../utils/FormatDate";
const DoctorAbout = ({ name, about, qualification, experience }) => {
  return (
    <>
      <div>
        <h3 className="text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2">
          About Of
          <span className="text-sky-300 font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-black font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:pt-5">
          {qualification?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div>
                <span className="text-sky-300 text-[15px] leading-6 font-semibold">
                  {formatData(item.startingDate)} -{" "}
                  {formatData(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-black">
                  {item.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-black">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-black font-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:pt-5">
          {experience?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellow-200 text-[15px] leading-6 font-semibold">
                {formatData(item.startingDate)} - {formatData(item.endingDate)}
              </span>
              <p className="text-[14px] leading-5 font-medium text-black">
                {item.position}
              </p>
			  <p className='text-[14px] leading-5 font-medium text-black'>
						{item.hospital}.
					</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DoctorAbout;

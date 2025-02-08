import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import formatData from "../../utils/FormatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div className="mb-[50px]">
      <h4 className="text-[20px] leading-[30px] font-bold text-black mb-[30px]">
        All reviews (272)
      </h4>
      <div className="flex justify-between gap-10 mb-[30px]">
        <div className="flex gap-3">
          <figure className="w-10 h-10 rounded-full">
            <img className="w-full" src={avatar} alt="" />
          </figure>
          <div className="mt-12 ">
            <h5 className="text-[16px] leading-6 text-blue-500 font-bold">
              Tushar
            </h5>
            <p className="text-[14px] leading-6 text-black">
              {formatData("02-14-2023")}
            </p>
            <p className="mt-3 font-medium text-[15px]">
              Good services,highly recommended
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(5).keys()].map((_, index) => (
            <AiFillStar key={index} color="#0067ff" />
          ))}
        </div>
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => setShowFeedbackForm(true)}
          >
            Give feedback
          </button>
        </div>
      )}
      {
        showFeedbackForm && <FeedbackForm/>
      }
    </div>
  );
};

export default Feedback;

import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0); // Stores the selected rating
  const [hover, setHover] = useState(0);   // Stores the hover state
  const [reviewText,setReviewText] = useState('')
  const handleSubmitReview = async  e =>{
    e.preventDefault();
  }
  return (
    <form>
      <div>
        <h3 className="text-lg font-bold mb-4">How would you rate the overall experience?*</h3>
        <div className="flex gap-2">
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1;
            return (
              <button
                key={starIndex}
                type="button"
                onClick={() => setRating(starIndex)}               // Set rating on click
                onMouseEnter={() => setHover(starIndex)}           // Set hover on mouse enter
                onMouseLeave={() => setHover(0)}                   // Reset hover on mouse leave
                className={`text-[30px] cursor-pointer transition-colors duration-200 ${
                  starIndex <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'
                }`}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className='text-black text-[16px] leading-6 font-semibold mb-4 mt-0'>
          Share your feedback or suggestions*
        </h3>
        <textarea name="" id="" className='border border-black border-solid focus:outline outline-blue-500 w-full px-4 py-3 rounded-md ' rows={5} placeholder='Write your message' onChange={(e) =>setReviewText(e.target.value)}>
          
        </textarea>
      </div>
      <button className='px-4 py-2 rounded-md bg-blue-500 text-white' onClick={handleSubmitReview}>Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;

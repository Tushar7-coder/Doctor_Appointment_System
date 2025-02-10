import React from "react";

const Contact = () => {
  return (
    <section className="mt-8 px-5 sm:px-10 lg:px-20">
      <div className="text-md text-center">
        <h2 className="font-bold text-2xl lg:text-3xl text-center mb-6 lg:mb-8">Contact Us</h2>
        <p className="mb-6 lg:mb-10 text-gray-600">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form action="#" className="space-y-6 max-w-[700px] mx-auto">
          <div>
            <label htmlFor="email" className="block text-black font-semibold text-[16px] mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 text-[16px] text-black placeholder:text-gray-400 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-black font-semibold text-[16px] mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 text-[16px] text-black placeholder:text-gray-400 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-black font-semibold text-[16px] mb-2">
              Your Message
            </label>
            <textarea
              rows={6}
              id="message"
              placeholder="Leave a comment..."
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 text-[16px] text-black placeholder:text-gray-400 rounded-md"
            />
          </div>
          <div className="text-center">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

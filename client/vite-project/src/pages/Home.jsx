import React from "react";
import mask from "../assets/images/mask.png";
import heroImage1 from "../assets/images/hero-img01.png";
import heroImage2 from "../assets/images/hero-img02.png";
import heroImage3 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon2 from "../assets/images/icon02.png";
import icon3 from "../assets/images/icon03.png";
import featureImg from "../assets/images/feature-img.png";
import videoImg from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png"
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
const Home = () => {
  return (
    <>
      <section
        className="pt-[60px] 2xl:h-[800px]"
        style={{
          backgroundImage: `url(${mask})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-black font-[800] md:text-[60px] md:leading-[70px] px-7">
                  We help patients live a healthy, longer life.
                </h1>
                <p className="text-[18px] leading-[30px] font-[400] text-black mt-[18px] px-7">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Impedit incidunt doloribus, expedita assumenda voluptas
                  reiciendis veniam maxime molestiae odit animi!
                </p>
                <button className="px-7 py-3 bg-blue-500 text-black rounded-2xl mx-7 mt-10">
                  Request an Appointment
                </button>
              </div>
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px] ">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-black px-7">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellow-300 rounded-full block -mt-2.5 mx-7">
                    <p className="text-[18px] leading-[30px] font-[200] text-black mt-[18px] mx-7 w-[225px] pt-3">
                      Years of Experience
                    </p>
                  </span>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-black px-7">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-neutral-700 rounded-full block -mt-2.5 mx-7">
                    <p className="text-[18px] leading-[30px] font-[200] text-black mt-[18px] mx-7 w-[225px] pt-3">
                      Clinic Loction
                    </p>
                  </span>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-black px-7">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-green-300 rounded-full block -mt-2.5 mx-7">
                    <p className="text-[18px] leading-[30px] font-[200] text-black mt-[18px] mx-7 w-[225px] pt-3">
                      Patient Satisfaction
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-[30px] justify-end mx-auto px-8">
              <div>
                <img src={heroImage1} alt="" className="w-full" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImage2} alt="" className="w-full mb-[30px]" />
                <img src={heroImage3} alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-[50px] bg-white mx-auto px-2">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-bold">
              Providing the best medical services
            </h2>
            <p className="text-center text-black mt-4">
              World-class case for everyOne, Our health System offers unmatched,
              expert health Care.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon01} alt="" />
            </div>
            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-black font-bold text-center ">
                Find a Doctor
              </h2>
              <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center">
                World-class care for everyone. Our health System offers
                unmatched, expert health care. From the lab to the clinic.
              </p>
              <Link
                to="/doctors"
                className="w-[44px] h-[44px] rounded-full border border-solid border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-500 hover:border-none"
              >
                <FaArrowRight className="w-6 h-5 hover:text-white" />
              </Link>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon2} alt="" />
            </div>
            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-black font-bold text-center ">
                Find Location
              </h2>
              <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center">
                World-class care for everyone. Our health System offers
                unmatched, expert health care. From the lab to the clinic.
              </p>
              <Link
                to="/doctors"
                className="w-[44px] h-[44px] rounded-full border border-solid border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-500 hover:border-none"
              >
                <FaArrowRight className="w-6 h-5 hover:text-white" />
              </Link>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon3} alt="" />
            </div>
            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-black font-bold text-center ">
                Book an Appointment
              </h2>
              <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center">
                World-class care for everyone. Our health System offers
                unmatched, expert health care. From the lab to the clinic.
              </p>
              <Link
                to="/doctors"
                className="w-[44px] h-[44px] rounded-full border border-solid border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-500 hover:border-none"
              >
                <FaArrowRight className="w-6 h-5 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="px-7">
        <About />
      </section>
      <section>
        <div className="container px-7 lg:px-8">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="text-center font-bold text-3xl mt-4">
              Our medical service
            </h2>
            <p className="mt-3 text-xl mb-2">
              World-class care for everyone. Our health System offers
              unmatched,expert health care.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row px-12 mt-4 ">
            <div className="xl:w-[670px] ">
              <h2 className="font-bold text-4xl text-center px-7 mt-4">
                Get virtual treatment <br /> anytime.
              </h2>
              <ul className="mt-2">
                <li className="mt-4">1. Schedule the appointment directly.</li>
                <li className="mt-4">
                  2. Search for your physicians here, and contact their office.
                </li>
                <li className="mt-4">
                  3. View our physician who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/">
                <button className="px-4 py-2 rounded-2xl hover:text-black hover:border hover:border-black bg-blue-500 text-white border-none mt-4 hover:bg-white">
                  Learn more
                </button>
              </Link>
            </div>
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} alt="" className=" w-full md:w-3/4 " />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-black font-[600]">
                      Wed,25
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-black font-[600]">
                      10:00PM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellow-200 rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoImg} alt="" />
                  </span>
                </div>
                <div className="w-[65px] lg:w-[96px] bg-[#ccf0f3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-sky-300 font-[500] mt-2 lg:mt-4  rounded-full">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-black">Wayne Collins</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

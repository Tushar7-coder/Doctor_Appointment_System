import React from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";

import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
const MyAccount = () => {
  const [tab, setTab] = useState("bookings");
  const { dispatch } = useContext(AuthContext);
  const {data : userData, loading, error} = useFetchData(`${BASE_URL}/users/profile/me`);
  console.log(userData);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <section>
      <div className="mx-w-[1170px] px-7 mx-auto mt-7">
        {
          loading && !error && <Loading/>
        }
        {error && !loading && <Error errMessage={error}/>}
        {
          !loading && !error &&(
            <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-blue-500">
                <img
                  src={userData.photo || userImg}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-black font-bold">
                {userData.name}
              </h3>
              <p className="text-[18px] leading-[30px] text-black font-bold">
                {userData.email}
              </p>
              <p className="text-balance text-[15px] leading-6 font-medium">
                Blood Type:{" "}
                <span className="ml-2 text-black text-[22px] leading-8">
                  {userData.bloodType}
                </span>
              </p>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
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
          <div className="md:col-span-2 md:px-[30px]">
            <div className="flex gap-2">
              <button
                className={`${
                  tab === "bookings" && " text-white bg-blue-500 font-normal"
                } p-2 px-5 rounded-md border-blue-500 font-semibold border text-[16px] leading-7 text-blue-500`}
                onClick={() => setTab("bookings")}
              >
                My Bookings
              </button>

              <button
                className={`${
                  tab === "settings" && " text-white bg-blue-500 font-normal"
                } p-2 px-5 rounded-md border-blue-500 font-semibold border text-[16px] leading-7 text-blue-500`}
                onClick={() => setTab("settings")}
              >
                Profile Settings
              </button>
            </div>
            {tab === "bookings" && <MyBookings />}
            {tab === "settings" && <Profile userData={userData} />}
          </div>
        </div>
          )
        }
      </div>
    </section>
  );
};

export default MyAccount;

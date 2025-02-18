import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import {BASE_URL , token} from "../../config";
import {toast} from "react-toastify";




const Profile = ({doctorData}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualification: [],
    experience: [],
    timeslot: [],
    about: "",
    photo: null,
  });
  useEffect(() => {
    setFormData({
      name: doctorData?.name || "",
      email: doctorData?.email || "",
      phone: doctorData?.phone || "",
      bio: doctorData?.bio || "",
      gender: doctorData?.gender || "",
      specialization: doctorData?.specialization || "",
      ticketPrice: doctorData?.ticketPrice || 0,
      qualification: doctorData?.qualification || [],
      experience: doctorData?.experience || [],
      timeslot: doctorData?.timeslot || [],
      about: doctorData?.about || "",
      photo: doctorData?.photo || null,
    });
  }, [doctorData]);
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file)
    console.log(data)
    setFormData({ ...formData, photo: data.url });
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try{
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id }`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })
        const result = await res.json()
      if(!res.ok){
        throw new Error(result.message || "Something went wrong")
      }

      toast.success(result.message)
    }catch(error){
      toast.error(error.message)
      //console.log(error)
  };
  }
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };
  const handleQualificationChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault(); // Prevents form submission
    addItem("qualification", {
      startingDate: "",
      endingDate: "",
      positon: "Senior Surgeon",
      hospital: "SCB",
    });
  };
  const handleQualificationChange = (event, index) => {
    handleQualificationChangeFunc("qualification", index, event);
  };
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualification", index);
  };

  const addExperience = (e) => {
    e.preventDefault(); // Prevents form submission
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: [
        ...prevFormData.experience,
        { startingDate: "", endingDate: "", degree: "psd", university: "scb" },
      ],
    }));
  };
  const handleExperienceChange = (event, index) => {
    handleQualificationChangeFunc("experience", index, event);
  };
  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experience", index);
  };

  const addTimeSlot = (e) => {
    e.preventDefault(); // Prevents form submission
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeslot: [
        ...prevFormData.timeslot,
        { day: "Sunday", startingTime: "10:00", endingTime: "04:30" },
      ],
    }));
  };
  const handleTimeSlotChange = (event, index) => {
    handleQualificationChangeFunc("timeslot", index, event);
  };
  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeslot", index);
  };
  return (
    <div>
      <h2 className="text-black font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Fill name "
            className=" px-2 py-2 border w-full"
          />
        </div>
        <div className="mb-5">
          <p className="">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email "
            className=" px-2 py-2 border w-full"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="">phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number "
            className=" px-2 py-2 border w-full"
          />
        </div>
        <div className="mb-5">
          <p className="">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio "
            className=" px-2 py-2 border w-full"
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="px-2 py-2 w-full">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="px-2 py-3.5 border w-full"
              >
                <option value="">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="px-2 py-2 w-full">Specialization</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="px-2 py-3.5 border w-full"
              >
                <option value="">select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="px-2 py-2 w-full">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="px-2 py-3.5 border w-full"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="px-2 py-2 w-full">Qualification</p>
          {formData.qualification?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="px-2 py-2 w-full">Starting Date*</p>
                    <input
                      type="date"
                      value={item.startingDate}
                      name="startingDate"
                      className="px-2 py-3.5 border w-full"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="px-2 py-2 w-full">Ending Date*</p>
                    <input
                      type="date"
                      value={item.endingDate}
                      className="px-2 py-3.5 border w-full"
                      name="endingDate"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="px-2 py-2 w-full">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="px-2 py-3.5 border w-full"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="px-2 py-2 w-full">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="px-2 py-3.5 border w-full"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="px-2 py-2 w-full">Experience</p>
          {formData.experience?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="px-2 py-2 w-full">Starting Date*</p>
                    <input
                      type="date"
                      value={item.startingDate}
                      name="startingDate"
                      className="px-2 py-3.5 border w-full"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="px-2 py-2 w-full">Ending Date*</p>
                    <input
                      type="date"
                      value={item.endingDate}
                      className="px-2 py-3.5 border w-full"
                      name="endingDate"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="px-2 py-2 w-full">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.positon}
                      className="px-2 py-3.5 border w-full"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="px-2 py-2 w-full">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="px-2 py-3.5 border w-full"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button onClick={e => deleteExperience(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="px-2 py-2 w-full">Time slots</p>
          {formData.timeslot?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="px-2 py-2 w-full">Day*</p>
                    <select
                      name="day"
                      id=""
                      value={item.day}
                      className="px-2 py-3.5 w-full"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                  <div>
                    <p className="px-2 py-2 w-full">Starting time*</p>
                    <input
                      type="time"
                      value={item.startingTime}
                      className="px-2 py-3.5 border w-full"
                      name="startingTime"
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="px-2 py-2 w-full">Ending time*</p>
                    <input
                      type="time"
                      value={item.endingTime}
                      className="px-2 py-3.5 border w-full"
                      name="endingTime"
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div onClick={(e) => deleteTimeSlot(e, index)}  className="flex items-center">
                    <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addTimeSlot}  className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
            Add TimeSlot
          </button>
        </div>
        <div className="mb-5">
          <p className="px-2 py-3.5 w-full">About</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you "
            onChange={handleInputChange}
            className="px-2 py-2 border w-full"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-600 flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[160px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem]
                  py-[.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-black font-semibold rounded-lg truncate cursor-pointer"
              htmlFor="customFile"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="bg-blue-500 text-white text-[18px] leading-[30px] w-full px-4 py-3 rounded-md"
            onClick={updateProfileHandler}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

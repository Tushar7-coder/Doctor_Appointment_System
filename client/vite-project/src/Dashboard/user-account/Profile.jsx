import React, { useEffect } from "react";
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudnary from "../../utils/uploadCloudinary";
import { BASE_URL} from "../../config/";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { token } from "../../config";
const Profile = ({user}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "patient",
    bloodType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {  // ✅ Ensure `user` is not null or undefined
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        email: user.email || "",
        bloodType: user.bloodType || "",
        photo: user.photo || "",
        gender: user.gender || "",
      }));
    }
  }, [user]);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected File:", file); //  Log selected file

    const data = await uploadImageToCloudnary(file);
    console.log("Cloudinary Response:", data.secure_url); //  Log uploaded URL

    if (!data || !data.secure_url) {
      toast.error("Image upload failed! Try again.");
      return;
    }

    
    setSelectedFile(data.secure_url);

    setFormData((prevData) => ({
      ...prevData,
      photo: data.secure_url,
    }));

    console.log("Updated FormData with Image:", formData); // ✅ Debug check
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Ensure `photo` is not null before submitting
    if (!formData.photo) {
      toast.error("Please wait for the image to upload.");
      setLoading(false);
      return;
    }

    console.log("Final Form Data Before Submission:", formData); //  Debug log

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response Data:", data); //  Log API response

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(data.message);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              className="w-full px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black placeholder:text-black cursor-pointer"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black placeholder:text-black cursor-pointer"
              aria-readonly readOnly
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black placeholder:text-black cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Blood Type"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black placeholder:text-black cursor-pointer"
              required
            />
          </div>
          <div className="mb-5 flex items-center justify-between">
            

            <label
              htmlFor="gender"
              className="text-black font-bold text-[16px] leading-7"
            >
              Gender:
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="text-black font-semibold text-[15px] leading-7 px-4 py-3"
              >
                <option value="">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-600 flex items-center justify-center">
              <img src={formData.photo} alt="" className="w-full rounded-full" />
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
              {selectedFile ? selectedFile.name : 'upload photo'}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-blue-600 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

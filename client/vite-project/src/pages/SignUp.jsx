import React, { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudnary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });
  const navigate = useNavigate();
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
  
    setPreviewURL(data.secure_url);
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
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
      console.log("Response Data:", data); //  Log API response
  
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
      setLoading(false);
    }
  };
  
  return (
    <section className="px-5 xl:px-0 mt-10">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-blue-600 rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-black text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-blue-600">account</span>
            </h3>
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
                    required
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
                <div className="mb-5 flex items-center justify-between">
                  <label
                    htmlFor="role"
                    className="text-black font-bold text-[16px] leading-7"
                  >
                    Are you a:
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      id="role"
                      className="text-black font-semibold text-[15px] leading-7 px-4 py-3"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>

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
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-600 flex items-center justify-center">
                    <img
                      src={previewURL}
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
                  disabled={loading && true}
                  className="w-full bg-blue-600 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              <p>
                Already have an account?
                <Link to="/login" className="text-blue-500 font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

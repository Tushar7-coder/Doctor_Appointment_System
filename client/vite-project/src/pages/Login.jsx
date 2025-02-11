import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from "react-toastify";
import { useAuth } from '../context/authContext'; // Use safe custom hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth(); // Use safe hook to access AuthContext

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Final Form Data Before Submission:", formData);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      console.log("Full API Response:", result);

      if (!res.ok || !result.success || !result.user || !result.token) {
        throw new Error(result.message || "Invalid credentials");
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.user, 
          token: result.token,
          role: result.user.role || "guest" // Default role if missing
        }
      });

      setLoading(false);
      toast.success(result.message);
      navigate('/home');

    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
      setLoading(false);
    }
  };
  
  return (
    <section className='px-5 lg:px-0'>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 mt-20">
        <h3 className='text-black text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-blue-600'>Welcome</span> Back
        </h3>
        <form className='py-4 md:py-0' onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder='Enter your Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black placeholder:text-black cursor-pointer'
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder='Enter your Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-600 text-[16px] leading-7 text-black placeholder:text-black cursor-pointer'
              required
            />
          </div>
          <div className='mt-7'>
            <button
              type="submit"
              className='w-full bg-blue-600 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <p>
            Don&apos;t have an account?
            <Link to='/register' className='text-blue-500 font-medium ml-1'>Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;

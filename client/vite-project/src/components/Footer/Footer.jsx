import React from 'react'
import {Link} from "react-router-dom"
import logo from '../../assets/images/logo.png';

import { AiFillYoutube , AiFillGithub ,AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com/@tusharkanta6046",
    icon : <AiFillYoutube className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path: "https://github.com/Tushar7-coder",
    icon : <AiFillGithub className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path: "",
    icon : <AiFillInstagram className='group-hover:text-white w-4 h-5'/>,
  },
  {
    path: "https://www.linkedin.com/in/tusharkanta-bihari-b839141a8/",
    icon : <AiFillLinkedin className='group-hover:text-white w-4 h-5'/>,
  }
]

const quiclLink01 = [
  {
    path : '/home',
    display : "Home",
  },
  {
    path : '/',
    display : "About us"
  },
  {
    path : '/services',
    display : "Services"
  },
  {
    path : "/",
    display : "Blog"
  }
]

const quickLink02 = [
  {
    path : '/find-a-doctor',
    display : 'Find a doctor'
  },
  {
    path: '/',
    display : 'Request an appointment'
  },
  {
    path : '/',
    display : 'Find a Location'
  },
  {
    path : '/',
    display : 'Get a Opinion'
  }
]
const quickLink03 = [
  {
    path : "/",
    display : 'Donate'
  },
  {
    path : '/contact',
    display : 'Contact Us'
  }
]
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 pt-10 px-7'>
    <div className="container">
      <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
        <div>
          <img src={logo} alt="" />
          <p className="text-[16px] leading-7 font-[400] text-black mt-4">
            Copyright © {year} developed by Tushar all right reserved.
          </p>
          <div className='flex items-center gap-3 mt-4'>
            {socialLinks.map((link,index) => <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center group hover:bg-blue-500 hover:border-none'>{link.icon}</Link>)}
          </div>
        </div>
        <div >
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-black'>Quick Links</h2>
          <ul>
            {quiclLink01.map((item,index) =>(
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-black'>
                    {
                      item.display
                    }
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div >
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-black'>I want to</h2>
          <ul>
            {quickLink02.map((item,index) =>(
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-black'>
                    {
                      item.display
                    }
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div >
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-black'>Support</h2>
          <ul>
            {quickLink03.map((item,index) =>(
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-black'>
                    {
                      item.display
                    }
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
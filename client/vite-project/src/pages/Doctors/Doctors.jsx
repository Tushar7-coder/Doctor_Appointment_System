import React from 'react'
import {doctors} from "../../assets/data/doctor"
import DoctorCard from "../../components/Doctors/DoctorCard"
import Testimonial from '../../components/Testimonial/Testimonial'
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from "../../components/Loader/Loading"
import Error from '../../components/Error/Error'

const Doctors = () => {
  const {data : doctors, loading, error} = useFetchData(`${BASE_URL}/doctors`)
  return (
	<>
    <section className=''>
    <div className='w-full mx-auto px-4 text-center bg-amber-100 pt-8 pb-12'>
      <h2 className='text-2xl lg:text-4xl font-bold'>Find a doctor</h2>
      <div className="max-w-[570px] mt-[30px] mx-auto bg-blue-300 rounded-md flex items-center justify-between">
        <input type="text" className='max-w-[700px] py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer text-white ' placeholder='Searcha Doctor'/>
        <button className='py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-r-md text-white font-medium'>Search</button>
      </div>
    </div>
  </section>
  <section>
  {loading && <Loader/>}
	{error && <Error/>}
  {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{
				doctors.map((doctor,index) =><DoctorCard key={doctor._id || index} doctor = {doctor}/>)
			}
		</div>}
  </section>
  <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto mt-[30px]">
            <h2 className="text-center text-2xl lg:text-4xl">What out patient says</h2>
            <p className="text-center text-black mt-4 ">
              World-class care for everyone. Our health Sysyem offers unmatched, expert health care.
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
  </>
  )
}

export default Doctors
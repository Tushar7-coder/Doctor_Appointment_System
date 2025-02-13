import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import DoctorCard from "../../components/Doctors/DoctorCard"
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
const MyBookings = () => {
  const {data : appointments, loading, error} = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
	<div>
      {loading && !error && <Loading/>}
      {error && !loading && <Error errMessage={error}/>}
      {!loading && !error && <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>{
        appointments.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor}/>
        ))
      }</div>}
      {!error && !loading && appointments.length === 0 && <h2 className='text-[18px] leading-[30px] text-black font-[700] text-center mt-5'>No appointments yet</h2>}
  </div>
  )
}

export default MyBookings
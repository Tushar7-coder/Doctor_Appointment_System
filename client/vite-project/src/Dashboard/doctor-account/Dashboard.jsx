import {useState} from 'react'
import Loader from '../../components/Loader/Loading.jsx'
import Error from "../../components/Error/Error.jsx"
import useFetchData from '../../hooks/useFetchData' 
import {BASE_URL} from '../../config'
import starIcon from "../../assets/images/Star.png"
import Tab from './Tab'
import DoctorAbout from '../../pages/Doctors/DoctorAbout.jsx'
import Profile from './Profile.jsx'


const Dashboard = () => {
  const {loading,error,data} = useFetchData(`${BASE_URL}/doctors/profile/me`);
  const [tab, setTab] = useState("overview");
  console.log(data)
  return (
	<section>
    <div className="max-w-[1170px] px-5 mx-auto">
    {loading && !error && <Loader />}
    {error && !loading && <Error />}
    {!loading && !error &&(
      <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
        <Tab tab={tab} setTab={setTab}/>
        <div className="lg:col-span-2">
          {data &&data.isApproved === "pending" && (
            <div className="flex mt-4 p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
               <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd" // ✅ Fixed fill-rule issue
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className='sr-only'>Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll review manually and approve it within 3days.
                  </div>
            </div>
          ) }
          <div className="mt-8">
            {tab === "overview" && <div>
                <div className="flex items-center gap-4 mb-10">
                  <figure className='max-w-[200px] max-h-[200px]'>
                    <img src={data?.photo ?data.photo : "https://static.vecteezy.com/system/resources/previews/024/585/326/large_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png"} className='w-full' alt="" />
                  </figure>
                  <div>
                    <span className='bg-[#ccf0f3] text-sky-300 px-4 py-1 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                      Surgeon
                    </span>
                    <h3 className="text-[22px] leading-9 font-bold mt-3 text-black">{data?.name}</h3>
                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-black text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                        <img src={starIcon} alt="" />
                        4.5
                      </span>
                      <span className="flex items-center gap-[6px] text-black text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                        
                        (233)
                      </span>
                    </div>
                    <p className='text-black font-[15px] lg:max-[390px] leading-6'>doctor bio</p>
                  </div>
                </div>
                <DoctorAbout name={data.name} about={data.about} qualifications={data.qualifications} experience={data.experience} />
              </div>}
              {tab === "appointments" && <div>
                appointments
              </div>}
              {tab === "settings" && <div><Profile/></div>}
          </div>
        </div>
      </div>
    )}
    </div>
  </section>
  )
}

export default Dashboard
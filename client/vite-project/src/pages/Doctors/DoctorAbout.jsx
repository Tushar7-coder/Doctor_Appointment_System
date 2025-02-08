import React from 'react'
import  formatData  from '../../utils/FormatDate'
const DoctorAbout = () => {
  return (
	<>
		<div>
			<h3 className='text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2'>About Of
				<span className='text-sky-300 font-bold text-[24px] leading-9'>
					Tusharkanta
				</span>
			</h3>
			<p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, odio. Cumque dignissimos, perspiciatis optio earum, iste atque modi deleniti dolore cupiditate voluptatum, illo voluptatibus reiciendis in culpa delectus tempora! Consectetur?</p>
		</div>
		<div className="mt-12">
			<h3 className='text-[20px] leading-[30px] text-black font-semibold'>Education</h3>
			<ul className='pt-4 md:pt-5'>
				<li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
					<div>
						<span className='text-sky-300 text-[15px] leading-6 font-semibold'>
							23 June, 2008
						</span>
						<p className='text-[16px] leading-6 font-medium text-black'>PHD in Surgeon</p>
					</div>
					<p className='text-[14px] leading-5 font-medium text-black'>
						New Apollo Hospital, New York.
					</p>
				</li>
				<li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
					<div>
						<span className='text-sky-300 text-[15px] leading-6 font-semibold'>
							{formatData("12-04-2010")}
						</span>
						<p className='text-[16px] leading-6 font-medium text-black'>PHD in Surgeon</p>
					</div>
					<p className='text-[14px] leading-5 font-medium text-black'>
						New Apollo Hospital, New York.
					</p>
				</li>
			</ul>
		</div>
		<div className='mt-12'>
			<h3 className='text-[20px] leading-[30px] text-black font-semibold'>Experience</h3>
			<ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:pt-5'>
				<li className="p-4 rounded bg-[#fff9ea]">
					<span className='text-yellow-200 text-[15px] leading-6 font-semibold'>
						{formatData("07-04-2010")} - {formatData("08-13-2014")}
					</span>
					<p className='text-[14px] leading-5 font-medium text-black'>Sr. Surgen</p>
				</li>
				<li className="p-4 rounded bg-[#fff9ea]">
					<span className='text-yellow-200 text-[15px] leading-6 font-semibold'>
						{formatData("07-04-2010")} - {formatData("08-13-2014")}
					</span>
					<p className='text-[14px] leading-5 font-medium text-black'>Sr. Surgen</p>
				</li>
			</ul>
		</div>
	</>
  )
}

export default DoctorAbout
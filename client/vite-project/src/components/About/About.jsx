import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from "../../assets/images/about-card.png"
import { Link } from 'react-router-dom'
const About = () => {
  return (
	<section>
		<div className="container mx-auto px-8">
			<div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
				<div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
					<img src={aboutImg} alt="" />
					<div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
						<img src={aboutCardImg} alt="" />
					</div>
				</div>

				<div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
					<h2 className='text-3xl font-bold mt-4 '>Proud to be one of the nations best</h2>
					<p className='text-lg font-semibold mt-4'>For 30 years in a row , U.S. News & World Report has recognized us as one of the best publics hospitals in the Nation and #1 in Texas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius libero accusantium voluptatum eos molestiae excepturi voluptatem nemo enim dolor obcaecati!</p>

					<p className='mt-4 font-semibold text-lg mb-4'>Our best is something we strive for each day,caring for our patients-not looking back at what we accomplished but towards what we can do tomorrow. Providing the best. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptates recusandae vero quam animi ut, asperiores nostrum adipisci in vitae?</p>
					<Link to='/' className="px-7 py-3 rounded-2xl border border-solid border-black hover:bg-blue-500 text-black hover:text-white hover:border-none mt-4">
					Learn More
					</Link>
				</div>
			</div>
		</div>
	</section>
  )
}

export default About
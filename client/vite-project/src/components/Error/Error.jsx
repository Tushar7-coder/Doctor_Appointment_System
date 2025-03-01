import React from 'react'

const Error = ({errMessage}) => {
  return (
	<div className='flex items-center justify-center h-full w-full'>
		<h3 className='text-black text-[20px] leading-[30px] font-semibold'>{errMessage}</h3>	

	</div>
  )
}

export default Error
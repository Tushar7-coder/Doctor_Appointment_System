import React from 'react'
import HashLoader from "react-spinners/HashLoader";
const Loading = () => {
  return (
	<div className='flex otem-center justify-center h-full w-full'>
    <HashLoader color='#0067ff'/>
  </div>
  )
}

export default Loading
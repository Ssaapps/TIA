import React from 'react'
import { useNavigate } from 'react-router-dom';

function UploadSuccess({isAdmin}) {
    const navigate = useNavigate();

  return (
   
<div className="pt-10 h-screen">
  <div className="bg-white p-6  md:mx-auto">
    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
      <path
        fill="currentColor"
        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
      ></path>
    </svg>
    <div className="text-center">
      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
        Media Uploaded Successfully
      </h3>
      <p className="text-gray-600 my-2">
        You have successfully uploaded media
      </p>
      <p> Have a great day!</p>
      <div className="py-10 text-center">
        <button onClick={()=>{
          if(isAdmin){
        navigate('/')
            

          }
          else {
            navigate('/')
          }
        }} className="px-12 rounded-md bg-primary hover:bg-primary text-white font-semibold py-3">
          Go to home
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default UploadSuccess
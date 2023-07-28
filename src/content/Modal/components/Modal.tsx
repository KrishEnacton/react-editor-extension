import React from 'react'
const Modal:React.FC<{}> = ({}) => {
  return (
    <div className='rounded-md m-4 p-6 bg-[#FFF7EF] border top-[120px] right-[300px] border-gray-400 w-[300px] text-black absolute'>
      <div className='text-lg font-bold'>Editor Scrapper</div>
      <button>Start Scrapping</button>
      <div>
        <div>Scrapping</div>
      </div>
    </div>
  )
}

export default Modal

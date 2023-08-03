import React from 'react'
import { startScrapping } from '../../Scrapping'
const ScrapperModal: React.FC<{ merchantConfig: any }> = ({ merchantConfig }) => {
  return (
    <div className="rounded-md m-4 p-6 text-center bg-[#FFF7EF] border top-[120px] right-[50px] border-gray-400 w-[300px] text-black fixed">
      <div className="text-lg font-bold">Editor Scrapper</div>
      <button
        onClick={() => startScrapping(merchantConfig)}
        className="bg-green-600 px-4 py-1 my-2 text-white border border-green-300 hover:bg-green-700 rounded-md"
      >
        Start Scrapping
      </button>
    </div>
  )
}

export default ScrapperModal

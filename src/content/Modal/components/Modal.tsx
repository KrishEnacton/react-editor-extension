import React from 'react'
import { scrapingData } from '../../../utils'
const Modal: React.FC<{ merchantConfig: any }> = ({ merchantConfig }) => {
  function startScrapping() {
    const value = scrapingData(merchantConfig)
    console.log({ value })
  }
  return (
    <div className="rounded-md m-4 p-6 bg-[#FFF7EF] border top-[120px] right-[300px] border-gray-400 w-[300px] text-black fixed">
      <div className="text-lg font-bold">Editor Scrapper</div>
      <button onClick={startScrapping}>Start Scrapping</button>
      <div>
        <div>Scrapping</div>
      </div>
    </div>
  )
}

export default Modal

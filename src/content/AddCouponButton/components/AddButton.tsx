import React, { useEffect, useState } from 'react'

const AddButton: React.FC<{}> = ({}) => {
  const [toggle, setToggle] = useState(true)
  function toggleSlider() {
    window.postMessage({ from: 'ADD_COUPON_BUTTON', payload: { toggle: toggle } }, '*')
  }

  useEffect(() => {
    window.addEventListener('message', (e: any) => {
      if (e.data.from == 'ADD_COUPON_SLIDER') {
        setToggle(e.data.payload.toggle)
      }
    })
  }, [])

  return (
    <div className="bottom-[120px] right-[50px] fixed">
      <button
        type="button"
        onClick={() => {
          setToggle(!toggle)
          toggleSlider()
        }}
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Add Coupon
      </button>
    </div>
  )
}

export default AddButton

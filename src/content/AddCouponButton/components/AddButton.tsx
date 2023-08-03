import React from 'react'

const AddButton: React.FC<{}> = ({}) => {
  return (
    <div className="bottom-[120px] right-[50px] fixed">
      <button
        type="button"
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Add Coupon
      </button>
    </div>
  )
}

export default AddButton

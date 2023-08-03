import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DatePicker
      className="px-4 py-2 rounded-md w-[345px] border border-slate-700 outline-none"
      selected={startDate}
      onChange={(date) => date != null && setStartDate(date)}
    />
  )
}

export default CustomDatePicker

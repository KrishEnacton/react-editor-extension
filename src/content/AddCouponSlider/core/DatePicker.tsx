import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date())
  return <DatePicker selected={startDate} onChange={(date) => date != null && setStartDate(date)} />
}

export default CustomDatePicker

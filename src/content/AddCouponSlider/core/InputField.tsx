import React from 'react'
import CustomDatePicker from './DatePicker'

const InputField: React.FC<{
  className?: string
  name: string
  id: string
  error?: string
  type: string
  onChange: (e: any) => void
  placeholder: string
}> = ({ error, id, onChange, placeholder, name, type }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-900">
        {name}
      </label>
      {type == 'text' ? (
        <input
          type="text"
          id={id}
          onChange={onChange}
          className="bg-white border border-slate-700 text-slate-700 placeholder-slate-300 text-sm rounded-lg focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
          placeholder={placeholder}
        />
      ) : type == 'date' ? (
        <CustomDatePicker />
      ) : (
        <textarea
          id={id}
          onChange={onChange}
          className="bg-white border border-slate-700 text-slate-700 placeholder-slate-300 text-sm rounded-lg focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        />
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default InputField

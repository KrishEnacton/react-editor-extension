import React, { useEffect, useState } from 'react'
import CrossIcon from '@heroicons/react/24/outline/XMarkIcon'
import InputField from '../core/InputField'

const AddCouponSlider: React.FC<{}> = ({}) => {
  const [Coupon, setCoupon] = useState({
    merchant_name: '',
    raw_title: '',
    raw_description: '',
    coupon_code: '',
    link: '',
    end_date: 0,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    merchant_name: '',
    raw_title: '',
    raw_description: '',
    link: '',
  })
  const [toggleSlider, setToggleSlider] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const requiredFields = ['merchant_name', 'raw_title', 'raw_description', 'link']
    const newErrors: { [key: string]: string } = {}

    requiredFields.forEach((field: string) => {
      //@ts-ignore
      if (!Coupon[field]) {
        newErrors[field] = `${field.replace('_', ' ').toLowerCase()} is required`
      }
    })

    setErrors(newErrors)

    // If any required field is empty, stop the form submission
    if (Object.keys(newErrors).length > 0) {
      return
    }
    console.log({ Coupon })
  }

  function toggleSliderHandler() {
    document.querySelector('body')?.setAttribute('style', 'width: 100%')
    window.postMessage({ from: 'ADD_COUPON_SLIDER', payload: { toggle: toggleSlider } }, '*')
  }

  useEffect(() => {
    window.addEventListener('message', (e: any) => {
      if (e.data.from == 'ADD_COUPON_BUTTON') {
        if (e.data.payload.toggle) {
          document.querySelector('body')?.setAttribute('style', 'width: 70%')
        } else {
          document.querySelector('body')?.setAttribute('style', 'width: 100%')
        }
        setToggleSlider(e.data.payload.toggle)
      }
    })
  }, [])

  return (
    <div
      className={`${
        toggleSlider ? 'slide-in' : 'slide-out'
      } rounded-md border top-[50px] border-slate-400 fixed w-[20%] bg-[#fefefe]`}
    >
      <div className="text-lg my-2 font-semibold text-center flex items-center">
        <div className="text-center mx-auto">Create Coupon</div>
        <button
          className="self-end rounded-md mx-4"
          onClick={() => {
            setToggleSlider(!toggleSlider)
            toggleSliderHandler()
          }}
        >
          <CrossIcon className="h-8 w-8" />
        </button>
      </div>
      <form className="flex flex-col p-4" onSubmit={onSubmit}>
        <InputField
          type={'text'}
          name={'Merchant Name'}
          id={'merchant_name'}
          error={errors['merchant_name']}
          onChange={(e) => setCoupon({ ...Coupon, merchant_name: e.target.value })}
          placeholder={'Enter Merchant Name'}
        />
        <InputField
          type={'text'}
          name={'Coupon Title'}
          error={errors['raw_title']}
          onChange={(e) => setCoupon({ ...Coupon, raw_title: e.target.value })}
          id={'raw_title'}
          placeholder={'Enter Coupon Title'}
        />
        <InputField
          name={'Coupon Description'}
          type={'textarea'}
          error={errors['raw_description']}
          onChange={(e) => setCoupon({ ...Coupon, raw_description: e.target.value })}
          id={'raw_description'}
          placeholder={'Enter Coupon Description'}
        />
        <InputField
          type={'text'}
          name={'Coupon Code'}
          onChange={(e) => setCoupon({ ...Coupon, coupon_code: e.target.value })}
          id={'coupon_code'}
          placeholder={'Enter Coupon Code'}
        />
        <InputField
          type={'text'}
          name={'Link'}
          error={errors['link']}
          onChange={(e) => setCoupon({ ...Coupon, link: e.target.value })}
          id={'link'}
          placeholder={'Enter Link'}
        />
        <InputField
          name={'Expiry Date'}
          type={'date'}
          onChange={(e) => setCoupon({ ...Coupon, end_date: e.target.value })}
          id={'end_date'}
          placeholder={'Enter Expiry Date'}
        />
        <button
          type="submit"
          className="rounded-md text-center bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save Coupon
        </button>
      </form>
    </div>
  )
}

export default AddCouponSlider

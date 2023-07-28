import { useEffect, useState } from 'react'
import { Login } from '../sections/login'

const withAuth = (Component: () => JSX.Element) => {
  function HOCComponent() {
    const [loading, setLoading] = useState(true)
    const [isValidate, setIsValidate] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        setIsValidate(false)
        setLoading(false)
      }, 3000)
      return () => {}
    }, [])

    if (loading) return <>Loading.....</>
    if (!isValidate) return <Login />
    return <Component />
  }
  return HOCComponent
}

export default withAuth

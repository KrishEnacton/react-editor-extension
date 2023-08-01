import { useEffect, useState } from 'react'
import Login from '../sections/login'
import { getUserInfo } from '../../api/apiFunctions'

const withAuth = (Component: () => JSX.Element) => {
  function HOCComponent() {
    const [loading, setLoading] = useState(false)
    const [isValidate, setIsValidate] = useState(false)
    useEffect(() => {
      setLoading(true)
      getUserInfo().then((res) => {
        if (res && Object.values(res).length > 0) {
          setIsValidate(true)
        }
      })
      setLoading(false)
      return () => {}
    }, [])

    if (loading) return <>Loading.....</>
    if (!isValidate) return <Login />
    return <Component />
  }
  return HOCComponent
}

export default withAuth

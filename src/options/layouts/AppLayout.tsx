import React, { useEffect, useLayoutEffect, useState } from 'react'
import FullScreenLoader from '../core/Loaders/FullScreenLoader'
import Login from '../sections/Login'
import { useStorage } from '../../hooks/useStorage'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isValidate, setIsValidate] = useState(false)
  const { getStorage } = useStorage()
  useEffect(() => {
    setLoading(true)
    getStorage('editor_info')
      .then((res) => {
        if (res && res.editor_info.token != '') {
          setIsValidate(true)
        }
      })
      .catch(console.log)
    setLoading(false)
    return () => {}
  }, [])

  if (loading)
    return <FullScreenLoader className={'flex h-screen w-screen justify-center items-center'} />

  if (!isValidate) return <Login />

  return <div>{children}</div>
}

export default AppLayout

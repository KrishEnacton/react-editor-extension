import { useEffect, useState } from 'react'
import { notify } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '../../../hooks/useStorage'
import { useAPIFunctions } from '../../../hooks/useFunctions'
import { api } from '../../../api/apiProvider'
import { config } from '../../../utils/config'

const Login = () => {
  const [token, setToken] = useState<string>('')
  const { setStorage, getStorage } = useStorage()
  const navigate = useNavigate()
  const { getMerchantList } = useAPIFunctions()
  function saveToken(token: string) {
    api.validate(config.local_url + config.getUserInfoEndpoint, token).then((res: any) => {
      if (res.id) {
        setStorage('editor_info', res).then((res) => {
          if (res) {
            notify('Editor Token saved!', 'success')
            navigate('/dashboard')
          }
        })
        getMerchantList()
      }
    })
  }

  useEffect(() => {
    getStorage('editor_info').then((res) => {
      if (res?.editor_info?.token) {
        navigate('/dashboard')
      }
    })
    return () => {}
  }, [])

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Coupomated Editor Extension
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="editor_token"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Token
                </label>
                <input
                  type="editor_token"
                  onChange={(e) => setToken(e.target.value)}
                  name="editor_token"
                  id="editor_token"
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Editor Token"
                />
              </div>
              <button
                type="button"
                onClick={() => saveToken(token)}
                className="rounded-md w-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Token
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

import { useStorage } from '../hooks/useStorage'
import { config } from '../utils/config'
import { api } from './apiProvider'

export function getUserInfo() {
  return new Promise((resolve) => {
    api.get(config.local_url + config.getUserInfoEndpoint).then((res: any) => {
      console.log({ res })
      resolve(res.data)
    })
  })
}

export function getMerchantList() {
  const { setStorage } = useStorage()
  return new Promise((resolve) => {
    api.get(config.local_url + config.getMerchantsEndpoint).then((res: any) => {
      console.log({ res })
      setStorage('merchant_lists', res.data)
      resolve(res)
    })
  })
}

export function logOut() {
  api.get(config.local_url + config.logOutEndPoint).then((res: any) => {
    console.log({ res })
  })
}

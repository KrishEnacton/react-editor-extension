import { useStorage } from '../hooks/useStorage'
import { config } from '../utils/config'
import { api } from '../api/apiProvider'
import { CouponType } from '../global'

export function useAPIFunctions() {
  const { clearStorage } = useStorage()
  function getUserInfo() {
    return new Promise((resolve) => {
      api
        .get(config.local_url + config.getUserInfoEndpoint)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((kk) => {
          console.log({ kk })
        })
    })
  }

  function getMerchantList() {
    const { setStorage } = useStorage()
    return new Promise((resolve) => {
      api.get(config.local_url + config.getMerchantsEndpoint).then((res: any) => {
        setStorage('merchant_lists', res.data)
        resolve(res)
      })
    })
  }

  function logOut() {
    return new Promise((resolve) => {
      api.get(config.local_url + config.logOutEndPoint).then((res: any) => {
        clearStorage().then((res) => {
          if (res) resolve(true)
        })
      })
    })
  }

  function bulkCouponsUpload(body: CouponType[]) {
    return new Promise((resolve) => {
      api.post(config.local_url + config.bulkUploadPoint, body).then((res: any) => {
        resolve(res)
      })
    })
  }
  return {
    getUserInfo,
    getMerchantList,
    logOut,
    bulkCouponsUpload,
  }
}

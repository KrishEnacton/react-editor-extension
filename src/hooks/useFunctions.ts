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
        .catch((err) => {
          console.log({ err })
        })
    })
  }

  function getUserMerchants() {
    const { setStorage } = useStorage()
    return new Promise((resolve) => {
      api.get(config.local_url + config.getUserMerchantsEndpoint).then((res: any) => {
        setStorage('user_merchants', res.data)
        resolve(res)
      })
    })
  }

  function logOut() {
    return new Promise((resolve) => {
      api.get(config.local_url + config.logOutEndPoint).then((res: any) => {
        if (res.data == null) {
          clearStorage().then((res) => {
            if (res) resolve(true)
          })
        }
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

  function getAllMerhants() {
    const { setStorage } = useStorage()
    return new Promise((resolve) => {
      api.get(config.local_url + config.getAllMerchantsEndpoint).then((res: any) => {
        setStorage('all_merchants', res.data)
        resolve(res)
      })
    })
  }
  function getAllCompetitorWebsites() {
    const { setStorage } = useStorage()
    return new Promise((resolve) => {
      api.get(config.local_url + config.competitorWebsitesEndpoint).then((res: any) => {
        setStorage('competitor_websites', res.data)
        resolve(res)
      })
    })
  }
  function getAllCompetitorMerchants() {
    const { setStorage } = useStorage()
    return new Promise((resolve) => {
      api.get(config.local_url + config.competitorMerchantsEndpoint).then((res: any) => {
        setStorage('competitor_merchants', res.data)
        resolve(res)
      })
    })
  }

  function getMerchantInfo(id: string) {
    return new Promise((resolve) => {
      api.get(config.local_url + config.getMerchantInfoEndpoint + id).then((res: any) => {
        resolve(res.data.merchant)
      })
    })
  }

  function initialApiCalls() {
    getUserMerchants()
    getAllMerhants()
    getAllCompetitorWebsites()
    getAllCompetitorMerchants()
  }
  return {
    getUserInfo,
    getUserMerchants,
    logOut,
    bulkCouponsUpload,
    getAllMerhants,
    getAllCompetitorWebsites,
    getAllCompetitorMerchants,
    initialApiCalls,
    getMerchantInfo,
  }
}

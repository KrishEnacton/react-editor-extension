import { getHeaders } from '../utils'

export const api = {
  get: function (url: string) {
    return new Promise(async (resolve, reject) => {
      fetch(url, {
        headers: (await getHeaders()) as any,
        method: 'GET',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json()
        })
        .then((data: any) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  },
  post: function (url: string, body: any) {
    return new Promise(async (resolve, reject) => {
      fetch(url, {
        headers: (await getHeaders()) as any,
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json()
        })
        .then((data: any) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  },
  validate: function (url: string, token: string) {
    return new Promise(async (resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: (await getHeaders()) as any,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          resolve(data.data)
          // Handle the data as needed
        })
        .catch((error) => {
          console.error('Error:', error)
          reject(error)
        })
    })
  },
}

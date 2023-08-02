function getEditorToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get('editor_token').then((res) => {
      resolve(res.editor_token)
    })
  })
}
export const api = {
  get: function (url: string) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          Authentication: `Bearer ${getEditorToken()}`,
        },
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
        headers: {
          Authentication: `Bearer ${await getEditorToken()}`,
        },
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
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

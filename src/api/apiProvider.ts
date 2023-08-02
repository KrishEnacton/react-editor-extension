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
          return res.json()
        })
        .then((data: any) => {
          console.log(data, 'data')
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  },
}

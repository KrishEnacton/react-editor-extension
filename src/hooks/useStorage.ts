export const useStorage = () => {
  function setStorage(name: string, body: any) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [name]: body }).then(() => {
        resolve(true)
      })
    })
  }
  function getStorage(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(name).then((res) => {
        if (Object.values(res).length == 0) reject(false)
        resolve(res)
      })
    })
  }

  function clearStorage() {
    return new Promise((resolve) => {
      chrome.storage.local.clear().then(() => {
        resolve(true)
      })
    })
  }

  return {
    setStorage,
    getStorage,
    clearStorage,
  }
}

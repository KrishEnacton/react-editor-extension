import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    chrome.storage.local.get(['editor_token'], (result) => {
      if (!result.editor_token) {
        navigate('/login')
        return
      }
    })
  }, [])

  return <div>Dashboard</div>
}

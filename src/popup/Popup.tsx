import { useState } from 'react'

function App() {
  const [crx, setCrx] = useState('create-chrome-ext')

  return (
    <main className='px-2 py-4 w-60 text-center'>
      <h3 className='underline text-red-800 text-xl'>Popup Page!</h3>

      <h6>v 0.0.0</h6>
      <p>with Tailwind integrated</p>

      <a href="https://www.npmjs.com/package/create-chrome-ext" target="_blank">
        Power by {crx}
      </a>
    </main>
  )
}

export default App

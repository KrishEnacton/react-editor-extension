import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../utils';

function App() {
  const [token, setToken] = useState<string>('')
  function saveToken(token: string) {
    chrome.storage.local.set(
      {
        editor_token: token?.trim(),
      },
      () => {
        notify('Token saved!', 'success')
        console.log("🔑 Editor token saved");
      }
    );
  }
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="mx-auto w-1/4 p-12 m-4 rounded-lg bg-[#fafafc] border border-[#e9e9f2]">
        <div className='text-center text-xl font-semibold'>Saved Tokens</div>
        <div className="flex flex-col">
          <label htmlFor="editor_token" className="text-md text-gray-500">
            Editor Token <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) => setToken(e.target.value)}
            type="text"
            id="editor_token"
            placeholder="Editor Token"
            name="Editor Token"
            className="rounded-md px-4 py-2 text-lg text-black border border-gray-600 focus:border-gray-400"
          />
          <button
            onClick={() => saveToken(token)}
            className="px-6 py-2 rounded-md text-md text-center bg-[#fed487] text-gray-500 my-4"
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default App

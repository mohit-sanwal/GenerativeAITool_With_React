import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <div className='grid grid-cols-5 h-screen'>
      <div className='col-span-1 bg-zinc-800'></div>
      <div className='col-span-4'>
         <div className='container h-160'>

         </div>
         <div className='flex p-2 pr-4 bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border border-zinc-400'>
           <input type="text" className='w-full h-full p-3 outline-none' placeholder='Ask me anything...' />
           <button>Ask</button>
         </div>
      </div>
    </div>
  )
}

export default App

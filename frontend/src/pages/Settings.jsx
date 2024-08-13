import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <div className='bg-black text-white text-3xl w-full h-[100vh] flex flex-col justify-center items-center'>
        <h1>OOps...!</h1>
        "Settings Page — Currently a work in progress, delayed due to time constraints."
        <Link to={"/"}>
            <button className='text-xl bg-gray-500 p-2 m-2 rounded-lg'>Back to Main Page</button>
        </Link>
    </div>
  )
}

export default Settings
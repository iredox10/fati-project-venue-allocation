import React from 'react'
import {FaPlus} from 'react-icons/fa'

const AddBtn = ({onclick}) => {
  return (
    <div className='absolute bottom-10 right-8'>
        <button onClick={onclick} className='bg-blue-600 hover:bg-blue-400 text-white p-5 rounded-full'><FaPlus /></button>
    </div>
  )
}

export default AddBtn
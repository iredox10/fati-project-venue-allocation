import React from 'react'
import { FaTimes, FaTimesCircle } from 'react-icons/fa'

const ErrMsg = ({err}) => {
  return (
    <div className='bg-green-50 p-1 flex justify-between items-center'>
        <p>{err}</p>
        <FaTimesCircle className='text-red-600' />
        </div>
  )
}

export default ErrMsg
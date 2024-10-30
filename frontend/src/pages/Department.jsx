import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const Department = () => {
    const {id}= useParams()
  const {data:department, error, loading} = useFetch(`/get-department/${id}`)
  console.log(department)
  return (
    <div>
        {department && department.levels.map(level =>(
            <div>
                <p><span>classname: </span>{level.name}</p>
                <p><span>number of students : </span>{level.noOfStudent}</p>
            </div>
        ))
}         
    </div>
  )
}

export default Department
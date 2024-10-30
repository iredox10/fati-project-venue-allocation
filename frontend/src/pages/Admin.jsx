import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const Admin = () => {
  const {data:departments, error, loading} = useFetch('/get-departments')
  console.log(departments)
  return (
    <div>
      <h1>departments</h1>
      {departments && departments.map(d => (
        <div>
          <Link to={`/department/${d._id}`}>{d.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Admin
import React from 'react'
import { useNavigate } from 'react-router-dom'
const UpdateBtn = ({ user }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/admin/update/${user._id}`)
  }
  return <button onClick={handleClick}>Update</button>
}

export default UpdateBtn

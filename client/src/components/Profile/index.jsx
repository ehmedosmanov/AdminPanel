import React, { useContext } from 'react'
import { AuthContext } from '../context/GlobalContext'

const Profile = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <h1>Profile</h1>

      <h1> {user && user.username}</h1>
    </div>
  )
}

export default Profile

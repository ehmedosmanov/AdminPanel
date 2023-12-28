import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AuthContext,
  axiosInstance
} from '../../components/context/GlobalContext'
import Update from './Update'
import UpdateBtn from './Update/button'

const Admin = () => {
  const [error, setError] = useState(null)
  const { token, adminUsers, getAllUsers } = useContext(AuthContext)

  const deleteUser = async id => {
    console.log(id)

    try {
      const res = await axiosInstance.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getAllUsers()
      console.log('User deleted successfully:', res.data)
    } catch (error) {
      console.error('Error deleting user:', error.response?.data.message)
    }
  }

  return (
    <div>
      <button>
        <NavLink to={'/admin/create'}>Create</NavLink>
      </button>
      <button>
        <NavLink to={'/admin/products'}>Products</NavLink>
      </button>
      <table>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {adminUsers
          ? adminUsers.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <ul>
                    <li>
                      <button onClick={() => deleteUser(user._id)}>
                        Delete
                      </button>
                    </li>
                    <li>
                      <UpdateBtn user={user} />
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          : null}
      </table>
    </div>
  )
}

export default Admin

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../components/context/GlobalContext'
import Update from './Update'
import UpdateBtn from './Update/button'

const Admin = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const { token } = useContext(AuthContext)
  console.log(token)
  const getAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = res.data.users
      setUsers(data)
    } catch (error) {
      setError(error.response?.data.message)
    }
  }

  const deleteUser = async id => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/user/${id}`, {
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
  useEffect(() => {
    getAllUsers()
    deleteUser()
  }, [])

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
        {users
          ? users.map(user => (
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

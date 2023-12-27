import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../components/context/GlobalContext'

const Navbar = () => {
  const { user, logout, role } = useContext(AuthContext)
  const isAuth = user
  console.log()
  return (
    <div>
      <nav>
        <ul>
          <li>Home</li>
          {!user ? (
            <>
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
              <li>
                <NavLink to={'/register'}>Register</NavLink>
              </li>
            </>
          ) : null}

          <li>
            <NavLink to={'/profile'}>Profile</NavLink>
          </li>
          <li>
            <NavLink to={'/products'}>OurProducts</NavLink>
          </li>
          {user && (user.role === 'admin' || user.role === 'superAdmin') ? (
            <li>
              <NavLink to={'/admin'}>Admin</NavLink>
            </li>
          ) : null}
          {user ? (
            <li>
              <button onClick={logout}>logout</button>
            </li>
          ) : (
            ' '
          )}
          <li></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

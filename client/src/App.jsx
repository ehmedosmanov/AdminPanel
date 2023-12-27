import { useContext, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Main from './layout/Main'
import Register from './components/Register'
import Login from './components/Login'
import PrivateRoute from './components/routes/PrivateRoute'
import Profile from './components/Profile'
import { AuthContext } from './components/context/GlobalContext'
import Admin from './layout/Admin'
import Create from './layout/Admin/Create'
import Update from './layout/Admin/Update'
import CreateProduct from './layout/Admin/CreateProduct'
import Products from './layout/Admin/Products'
import OurProducts from './components/OurProducts'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path={'/register'} element={<Register />} />
          {!user && <Route path={'/login'} element={<Login />} />}
          <Route
            element={<PrivateRoute check={['user', 'admin', 'superAdmin']} />}
            path={'/profile'}>
            <Route index element={<Profile />} />
          </Route>
          <Route path={'/products'} element={<OurProducts />} />
          <Route element={<PrivateRoute check={['admin', 'superAdmin']} />}>
            <Route path={'/admin'} element={<Admin />} />
            <Route path='/admin/create' element={<Create />} />
            <Route path='/admin/products' element={<Products />} />
            <Route
              path='/admin/products/CreateProduct'
              element={<CreateProduct />}
            />
            <Route path='/admin/update/:userId' element={<Update />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

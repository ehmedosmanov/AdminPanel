import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../components/context/GlobalContext'

const Products = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const { token } = useContext(AuthContext)
  console.log(token)
  const getAllProduct = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = res.data.products
      setProducts(data)
    } catch (error) {
      setError(error.response?.data.message)
    }
  }

  //   const deleteUser = async id => {
  //     try {
  //       const res = await axios.delete(`http://localhost:8000/api/user/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       getAllUsers()
  //       console.log('User deleted successfully:', res.data)
  //     } catch (error) {
  //       console.error('Error deleting user:', error.response?.data.message)
  //     }
  //   }
  useEffect(() => {
    getAllProduct()
  }, [])

  return (
    <div>
      <button>
        <NavLink to={'/admin/products/CreateProduct'}>Create Product</NavLink>
      </button>
      <table>
        <tr>
          <th>name</th>
          <th>price</th>
          <th>Action</th>
        </tr>
        {products
          ? products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <ul>
                    <li>
                      <button>Delete</button>
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

export default Products

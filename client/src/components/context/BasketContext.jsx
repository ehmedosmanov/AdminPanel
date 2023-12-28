import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext, axiosInstance } from './GlobalContext'

export const BasketContext = createContext()

export const BasketContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null)
  const [basket, setBasket] = useState(null)
  const { token, user } = useContext(AuthContext)

  const getAllProducts = async () => {
    try {
      const products = await axios.get('http://localhost:8000/api/product')
      const data = products.data
      setProducts(data.products)
    } catch (error) {
      console.error('Error fetching products:', error.response?.data.message)
    }
  }

  const addToBasket = async (productId, userId) => {
    try {
      const res = await axiosInstance.post(
        `/user/${userId}/basket`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(res)
      basketData()
    } catch (error) {
      console.error('Error:', error.response?.data.message)
    }
  }

  const basketData = async () => {
    console.log(user.userId)
    try {
      const res = await axiosInstance.get(`/user/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = res.data.user.basket
      console.log(data)
      setBasket(data)
    } catch (error) {
      console.error('Error:', error.response?.data.message)
    }
  }

  useEffect(() => {
    getAllProducts()
    if (token && user.userId) {
      basketData()
    }
  }, [token, user?.userId])
  return (
    <BasketContext.Provider value={{ products, addToBasket, basket }}>
      {children}
    </BasketContext.Provider>
  )
}

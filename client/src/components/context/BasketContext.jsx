import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './GlobalContext'
import { api } from '../http'

export const BasketContext = createContext()

export const BasketContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null)
  const [basket, setBasket] = useState(null)
  const { token, user } = useContext(AuthContext)
  console.log(token)
  const getAllProducts = async () => {
    try {
      const products = await api.get('/product')
      const data = products.data
      setProducts(data.products)
    } catch (error) {
      console.error('Error fetching products:', error.response?.data.message)
    }
  }

  const addToBasket = async (productId, userId) => {
    try {
      const res = await api.post(`/user/${userId}/basket`, { productId })
      console.log(res)
      basketData()
    } catch (error) {
      console.error('Error:', error.response?.data.message)
    }
  }

  const basketData = async () => {
    console.log(user.userId)
    try {
      const res = await api.get(`/user/${user.userId}`)
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
    } else {
      setBasket(null)
    }
  }, [token, user?.userId])

  return (
    <BasketContext.Provider
      value={{ products, addToBasket, basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  )
}

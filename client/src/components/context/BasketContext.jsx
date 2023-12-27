import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './GlobalContext'

export const BasketContext = createContext()

export const BasketContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null)
  const [basket, setBasket] = useState(null)
  console.log(basket)
  const { token } = useContext(AuthContext)
  console.log(token)
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
    console.log('productId', productId)
    console.log('userId:', userId)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/${userId}/basket`,
        productId,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response)
      const data = response.data
      console.log('Add To Basket - Response:', data)
      setBasket(data.user.basket)
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error Adding to Basket:', error.response.data.message)
      } else {
        console.error('Error Adding to Basket:', error.message)
      }
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <BasketContext.Provider value={{ products, addToBasket }}>
      {children}
    </BasketContext.Provider>
  )
}

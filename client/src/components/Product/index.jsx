import React, { useContext } from 'react'
import { BasketContext } from '../context/BasketContext'
import { AuthContext } from '../context/GlobalContext'

const Product = ({ id, name, price }) => {
  const { addToBasket } = useContext(BasketContext)
  const { user } = useContext(AuthContext)
  const userId = user.userId
  return (
    <div>
      <ul>
        <li>{name}</li>
        <li>{price}</li>
        <li>
          <button onClick={() => addToBasket(id, userId)}>Add To Basket</button>
        </li>
      </ul>
    </div>
  )
}

export default Product

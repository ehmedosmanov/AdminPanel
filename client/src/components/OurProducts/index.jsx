import React, { useContext } from 'react'
import Product from '../Product'
import { BasketContext } from '../context/BasketContext'

const OurProducts = () => {
  const { products } = useContext(BasketContext)
  console.log(products)
  return (
    <div>
      <h1>OurProducts:</h1>

      <div>
        {products &&
          products.map(product => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
            />
          ))}
      </div>
    </div>
  )
}

export default OurProducts

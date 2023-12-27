import React, { useContext } from 'react'
import Product from '../Product'
import { BasketContext } from '../context/BasketContext'
import BasketProduct from '../BasketProduct'

const OurProducts = () => {
  const { products,basket } = useContext(BasketContext)
  console.log('menm basket', basket);
  console.log(products)
  return (
    <>
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
      <div>
          <h1>Basket:</h1>
          {basket ? (
            basket.map(basketItem => (
              // console.log("BASKET ITEM",basketItem?.product)
              <BasketProduct
                key={basketItem?.product?._id}
                name={basketItem?.product?.name}
                price={basketItem?.product?.price}
                quantity={basketItem?.quantity}
              />
  
            ))
          ) : (
            <p>Your basket is empty</p>
          )}
        </div>
    </div>
    </>
  )
}

export default OurProducts

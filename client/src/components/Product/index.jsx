import React, { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { AuthContext } from "../context/GlobalContext";
import { Navigate, useNavigate } from "react-router-dom";

const Product = ({ id, name, price,quantity }) => {
  const { addToBasket } = useContext(BasketContext);
  const { user } = useContext(AuthContext);
  const userId = user?.userId;
  const navigate = useNavigate()
  const handleClick = (id, userId) => {
    if (!user) {
      return navigate('/login')
    } else {
      addToBasket(id, userId);
    }
  };
  return (
    <div>
      <ul>
        <li>{name}</li>
        <li>price: {price}</li>
        <li>
          <button onClick={() => handleClick(id, userId)}>Add To Basket</button>
        </li>
        <li>quantity : {quantity}</li>
      </ul>
    </div>
  );
};

export default Product;

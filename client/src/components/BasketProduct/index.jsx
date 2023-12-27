import React, { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { AuthContext } from "../context/GlobalContext";
import { Navigate, useNavigate } from "react-router-dom";

const BasketProduct = ({ id, name, price,quantity }) => {
  // const { user } = useContext(AuthContext);
  // const userId = user?.userId;
  // const navigate = useNavigate()

  return (
    <div>
      <ul className="basket">
        <li>{name}</li>
        <li>price: {price}</li>
        <li>Total Price: {price * quantity}</li>
        <li>quantity : {quantity}</li>
        <li>Remove Basket</li>
      </ul>
    </div>
  );
};

export default BasketProduct;

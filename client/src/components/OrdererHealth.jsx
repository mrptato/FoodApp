import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderHealth } from "../actions/index";

function OrdererHealth() {
  const order = useSelector((state) => state.orderHealth);
  const dispatch = useDispatch();

  return (
    <select
      value={order}
      onChange={(e) => dispatch(orderHealth(e.target.value))}
    >
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  );
}

export default OrdererHealth;

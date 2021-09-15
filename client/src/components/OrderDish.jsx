import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDish } from "../actions/index";

function OrderDish() {
  const loading = useSelector((state) => state.loading_dish);
  const dishtypes = useSelector((state) => state.dishtypes);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.dishOrder);

  if (loading) {
    <span>Cargando dishtypes...</span>;
  }
  return (
    <select
      value={order}
      onChange={(e) => dispatch(orderDish(e.target.value))}
    >
      <option value={"0"}>
        All
      </option>
      {dishtypes.map((dish) => {
        return (
          <option key={dish.id} value={dish.id}>
            {dish.name}
          </option>
        );
      })}
    </select>
  );
}

export default OrderDish;

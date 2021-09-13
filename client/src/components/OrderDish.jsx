import React from "react";
import { useSelector } from "react-redux";

function OrderDish() {
  const loading = useSelector((state) => state.loading_dish);
  const dishtypes = useSelector((state) => state.dishtypes);
  if (loading) {
    <span>Cargando dishtypes...</span>;
  }
  return (
    <select>
      {dishtypes.map((dish) => {
        return <option key={dish.id} value={dish.id}>{dish.name}</option>;
      })}
    </select>
  );
}

export default OrderDish;

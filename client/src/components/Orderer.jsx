import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAZ } from "../actions/index";

function Orderer() {
  const order = useSelector((state) => state.orderAz);
  const dispatch = useDispatch();

  return (
    <select
      value={order}
      onChange={(e) => dispatch(orderAZ(e.target.value))}
    >
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  );
}

export default Orderer;

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
      <option value="desc">Descendant</option>
      <option value="asc">Ascendant</option>
      <option value="morehealth">More healthy</option>
      <option value="lesshealth">Less healthy</option>
    </select>
  );
}

export default Orderer;

import React from "react";
import OrderDish from "./OrderDish";
import Orderer from "./Orderer";
import SearchBar from "./SearchBar";

// import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <label>
        <a href="http://localhost:3000/recipes">Home</a>
      </label>
      <span>
        <SearchBar />
      </span>
      <span>
        Ordenar: <Orderer />
      </span>
      <span>
        Tipo de plato: <OrderDish />
      </span>
      <span>
        <a href="http://localhost:3000/newrecipe">Agregar receta</a>
      </span>
    </>
  );
}

export default NavBar;

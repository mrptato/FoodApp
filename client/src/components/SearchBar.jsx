import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../actions/index";

function SearchBar() {
  const dispatch = useDispatch();
  const [valorBuscado, setValorBuscado] = useState();


  function handleClic(e) {
    console.log("hice clic, buscarValor: ", valorBuscado);
    dispatch(search(valorBuscado));
  }

  function handleChange(e) {
    setValorBuscado(e.target.value);
    // console.log("e.target.value", e.target.value);
  }

  return (
    <>
      <label>Buscar:</label>
      <input
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleClic()}
        name="buscar"
        onChange={(e) => handleChange(e)}
      ></input>
      <button type="button" onClick={() => handleClic()}>
        Buscar
      </button>
    </>
  );
}

export default SearchBar;

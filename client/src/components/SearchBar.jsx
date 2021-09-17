import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search } from "../actions/index";
import styled from "styled-components";

const colorA = "#F5E8C7";
const colorB = "#DEBA9D";
const colorC = "#9E7777";
const colorD = "#6F4C5B";
const colorW = "#ffffff";

const InputStyled = styled.input`
  border-color: ${colorD};
  font-size:1.5rem;
  border-radius:10px;
`

const Stylediv = styled.div`
  align-items: center;
  justify-content: center;

`

function SearchBar() {
  const dispatch = useDispatch();
  const [valorBuscado, setValorBuscado] = useState();

  useEffect(() => {
    dispatch(search(valorBuscado));
  },[valorBuscado]);

  function handleClic(e) {
    // console.log("hice clic, buscarValor: ", valorBuscado);
    // dispatch(search(valorBuscado));
  }

  function handleChange(e) {
    setValorBuscado(e.target.value);
    // console.log("e.target.value", e.target.value, valorBuscado);
    // dispatch(search(valorBuscado));
  }

  return (
    <Stylediv>
      <label>Search: </label>
      <InputStyled
        type="text"
        placeholder="Look up a recipe"
        autoComplete='off'
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => e.key === "Enter" && handleClic()}
        name="buscar"
      ></InputStyled>
      {/* <button type="button" onClick={() => handleClic()}>
        Buscar
      </button> */}
    </Stylediv>
  );
}

export default SearchBar;

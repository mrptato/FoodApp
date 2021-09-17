import React from "react";
import OrderDish from "./OrderDish";
import Orderer from "./Orderer";
import OrdererHealth from './OrdererHealth';
import SearchBar from "./SearchBar";
import styled from "styled-components";
// import { NavLink } from "react-router-dom";

const colorA = "#F5E8C7";
const colorB = "#DEBA9D";
const colorC = "#9E7777";
const colorD = "#6F4C5B";
const colorW = "#ffffff";

const NavStyled = styled.div`
  display: flex;
  font-weight: 700;
  width:100%;
  max-width: 1000px;
  padding: 1rem;
  font-size:1.2rem;
  align-items: space-between;
  align-self:center;
  justify-content: space-between;
  /* & * {
    flex-grow: 0;
    flex-shrink: 1;
  } */
`;

const SpanStyled = styled.span`
  align-self: center;
`;


const Button = styled.a`
  background: ${colorD};
  background-image: -webkit-linear-gradient(top, ${colorD}, ${colorC});
  background-image: -moz-linear-gradient(top, ${colorD}, #9e7777);
  background-image: -ms-linear-gradient(top, ${colorD}, #9e7777);
  background-image: -o-linear-gradient(top, ${colorD}, #9e7777);
  background-image: linear-gradient(to bottom, ${colorD}, #9e7777);
  -webkit-border-radius: 18;
  -moz-border-radius: 18;
  border-radius: 18px;
  text-shadow: 1px 1px 3px #666666;
  font-family: Arial;
  color: #f5e8c7;
  font-size: 17px;
  padding: 10px 10px 10px 10px;
  border: solid #deba9d 2px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: ${colorA};
    text-decoration: none;
  }
`;

function NavBar() {
  return (
    <NavStyled>
      <Button href="http://localhost:3000/recipes">Home</Button>
      <Button href="http://localhost:3000/newrecipe">Agregar receta</Button>
      <SpanStyled>
        <SearchBar />
      </SpanStyled>
      <SpanStyled>
        Ordenar: <Orderer />
      </SpanStyled>
      <SpanStyled>
       OrderHealth: <OrdererHealth />
      </SpanStyled>
      <SpanStyled>
        Tipo de plato: <OrderDish />
      </SpanStyled>
    </NavStyled>
  );
}

export default NavBar;

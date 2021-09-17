import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import backImg from "../assets/back01.jpg";

// import "../App.css";
const colorA = "#F5E8C7";
const colorB = "#DEBA9D";
const colorC = "#9E7777";
const colorD = "#6F4C5B";
const colorW = "#ffffff";

const Back = styled.div`
  display: flex;
  background-repeat: no-repeat;
  background-size: cover;
  /* position: absolute; */
  width: 100vw;
  height: 100vh;
  border-radius: 1.5rem;
  background-image: url(${backImg});
  justify-content: left;
  padding-left:10rem;
  align-items: center;
  align-content: center;
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
  border-radius: 30px;
  text-shadow: 1px 1px 3px #666666;
  font-family: Arial;
  color: #f5e8c7;
  font-size: 3.5rem;
  padding: 2rem;
  margin-left:5rem;
  border: solid #deba9d 2px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${colorC};
    font-size:3.6rem;
    text-decoration: none;
  }
`;

function Home() {
  return (
    <Back>
      <Button href="/recipes">Food and Recipes</Button>
    </Back>
  );
}

export default Home;

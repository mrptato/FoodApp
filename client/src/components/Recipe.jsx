import React from "react";
import styled from "styled-components";
// import defRecImage from '../assets/defaultRecipe.jpg';

const defRecImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmC4XDX5Ld4tcVSErS19pgTOImXdeEOR3Fw&usqp=CAU";

const colorA = "#F5E8C7";
const colorB = "#DEBA9D";
const colorC = "#9E7777";
const colorD = "#6F4C5B";
const colorW = "#ffffff";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size:1.5rem;
  padding:0;
  text-decoration: none;
`;

const BlockRecipe = styled.div`
  display: flex;
  /* gap: 10px; */
  column-gap: 0.5rem;
  background-color: ${colorA};
  margin: 1rem;
  padding: 1rem;
  border: 1rem solid;
  align-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-color: ${colorC};
  border-radius: 15px;
`;

const DivReceta = styled.a`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: ${colorA};
  text-decoration: none;

  color: ${colorD};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  & h2 {
    display: flex;
    font-size: 1rem;
    height: 3rem;
    align-items: center;
  }
  & h3 {
    display: flex;
    font-size: 1rem;
    height: 2rem;
    align-items: center;
  }

`;

const StyledImg = styled.img`
  width: 312;
  height: 231;
`;

function Recipe({
  id,
  title,
  name, // bd propia
  image,
  steps,
  diets,
  diet_types,
  healthScore,
  spoonacularScore,
  summary,
  score,
  healthy,
  detailed = false,
}) {
  if (typeof steps === "string") {
    steps = steps.split("%%%");
  }
  if (diet_types) {
    diet_types = diet_types.join(", ");
  }
  if (detailed) {
    return (
      <>
        <Grid>
          <h3 display="inline">
            <a href={id}>{title ? title : name}</a>
          </h3>
        </Grid>
        <BlockRecipe>
          <StyledImg
            src={image ? image : defRecImage}
            alt={"Image of " + name?.toUpperCase()}
          />
          <div><b>Resumen:</b></div>
          <div dangerouslySetInnerHTML={{ __html: summary }}></div>
          <div>Dietas: <b>{diets ? diets : diet_types}</b></div>
          <div>Score: <b>{spoonacularScore ? spoonacularScore : score}</b></div>
          <div>Health: <b>{healthScore ? healthScore : healthy}</b></div>
          <div>Pasos: {steps}</div>
        </BlockRecipe>
      </>
    );
  } else {
    return (
      <DivReceta href={id}>
        <h2 display="inline">{title ? title : name}</h2>
        <img
          src={image ? image : defRecImage}
          alt={"Image of " + name?.toUpperCase()}
        />
        <h3>
          {(diets && diets?.length !== 0) ||
          (diet_types && diet_types.length !== 0)
            ? "Diet type:"
            : "Without diet type defined"}
          {diets ? diets : diet_types}
        </h3>
      </DivReceta>
    );
  }
}

// EsPropia?{own?'si':'no'}

export default Recipe;

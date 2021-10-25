import React, { useState } from "react";
import Recipe from "./Recipe";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import styled from "styled-components";

const colorA = "#F5E8C7";
const colorB = "#DEBA9D";
const colorC = "#9E7777";
const colorD = "#6F4C5B";
const colorW = "#ffffff";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const BlockRecipe = styled.div`
  background-color: ${colorA};
  margin: 1.5rem;
  border: 1.2rem solid;
  border-color: ${colorC};
  border-radius: 15px;
  &:hover {
    transition: all 0.2s ease-in-out;
    border-radius: 0 solid;
    border-color: ${colorD};
    /* border: 2rem solid; */
  }
`;

const Button = styled.a`
  display: inline-block;
  /* flex-direction:rows; */
  background: ${colorD};
  background-image: -webkit-linear-gradient(top, ${colorD}, ${colorC});
  background-image: -moz-linear-gradient(top, ${colorD}, #9e7777);
  background-image: -ms-linear-gradient(top, ${colorD}, #9e7777);
  background-image: -o-linear-gradient(top, ${colorD}, #9e7777);
  background-image: linear-gradient(to bottom, ${colorD}, #9e7777);
  border-radius: 18px;
  text-shadow: 1px 1px 3px #666666;
  /* font-family: Arial; */
  color: #f5e8c7;
  font-size: 17px;
  padding: 5px;
  border: solid #deba9d 2px;
  text-decoration: none;
  text-align: center;
  justify-content: center;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: ${colorA};
    text-decoration: none;
  }
`;

function Recipes() {
  // const error = useSelector((state) => state.error);
  // const error_message = useSelector((state) => state.error_message);
  // const lastRecipe = actualPage * recipesPerPage;
  // const firstRecipe = lastRecipe - recipesPerPage;
  const [actualPage, setActualPage] = useState(0);
  const recipesPerPage = 9;
  const loading = useSelector((state) => state.loading);
  const search = useSelector((state) => state.search);
  const recipes = useSelector((state) =>
    search
      ? state.recipes.filter(
          (e) =>
            e.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            e.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : state.recipes
  );

  const dishOrder = useSelector((state) => state.dishOrder);
  const orderAz = useSelector((state) => state.orderAz);
  // const orderHealth = useSelector((state) => state.orderHealth);
  const dishTypes = useSelector((state) =>
    state.dishtypes.find((x) => x.id === parseInt(dishOrder))
  );

  let recipesFiltered = recipes
    .filter((recipe) =>
      parseInt(dishOrder) === 0
        ? recipe
        : //para solucionar la dif de nombres entre api y bd interna
          (recipe.diets || recipe.diet_types).find(
            (x) => x.toLocaleLowerCase() === dishTypes.name.toLocaleLowerCase()
          )
    )
    .sort(sortDishes);

  const totalPages = Math.ceil(recipesFiltered.length / recipesPerPage);
  const recipesPaged = [];

  for (let i = 0; i < totalPages; i++) {
    recipesPaged[i] = [];
    for (let j = 0; j < recipesPerPage; j++) {
      let position = recipesFiltered[i * recipesPerPage + j];
      if (position) {
        recipesPaged[i].push(recipesFiltered[i * recipesPerPage + j]);
      }
    }
  } 

  function takeToPage(e, index) {
    e.preventDefault();
    setActualPage(parseInt(index));
  }


  function sortDishes(a, b) {
    if (orderAz === "asc" || orderAz === "desc") {
      console.log('entre a asc y desc con orderAz:', orderAz)
      let valA = (a.title || a.name).toLocaleLowerCase();
      let valB = (b.title || b.name).toLocaleLowerCase();
      if (valA > valB) return orderAz === "asc" ? 1 : -1;
      if (valA < valB) return orderAz === "asc" ? -1 : 1;
      return 0;
    } else if (orderAz === "morehealth" || orderAz === "lesshealth") {
      console.log('entre a more y less health con orderAz:', orderAz)
      let valA = parseInt(a.healthy || a.healthScore);
      let valB = parseInt(b.healthy || b.healthScore);
      if (valA > valB) return orderAz === "morehealth" ? -1 : 1;
      if (valA < valB) return orderAz === "morehealth" ? 1 : -1;
      return 0;
    }
    return 0;
  }

  if (loading) {
    return (
      <Layout>
        <div>CARGANDO RECETAS</div>
      </Layout>
    );
  }
  if (recipesPaged.length > 0) {
    return (
      <Layout>
        <h1>Recipes</h1>
        <div>
          {[...Array(totalPages).keys()].map((p) => {
            return (
              <>
                <Button key={p} href="#" onClick={(e) => takeToPage(e, p)}>
                  {p + 1}{" "}
                </Button>{" "}
              </>
            );
          })}
        </div>
        <Grid>
          {recipesPaged[actualPage]?.map(function (recipe) {
            return (
              <BlockRecipe>
                <Recipe key={recipe.id} {...recipe} />
              </BlockRecipe>
            );
          })}
        </Grid>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>Lista de recetas</h1>
        <div>No hay recetas para mostrar</div>
      </Layout>
    );
  }
}

export default Recipes;

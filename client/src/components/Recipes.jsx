import React from "react";
import Recipe from "./Recipe";
import { useSelector } from "react-redux";

function Recipes() {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const error_message = useSelector((state) => state.error_message);
  const recipes = useSelector((state) => state.recipes);
  if (loading) {
    return <div>CARGANDO RECETAS</div>;
  }
  // console.log("-----------recipes:", recipes);
  if (recipes) {
    return (
      <div>
        <h1>Lista de recetas</h1>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} {...recipe} />
        ))}
      </div>
    );
  } else {
    return (
      <>
        <h1>Lista de recetas</h1>
        <div>No hay datos para mostrar</div>
      </>
    );
  }
}

export default Recipes;

import React from "react";
import Recipe from "./Recipe";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipeDetail } from "../actions/index";
// import { NavLink } from "react-router-dom";

function RecipeDetail(props) {
  const dispatch = useDispatch();
  const idRecipe = props.match.params.recipedetail;
  // if (idRecipe === 'newrecipe') return;
  
  useEffect(() => {
    dispatch(fetchRecipeDetail(idRecipe));
  }, []);
  const loading = useSelector((state) => state.loading_detail);
  const recipe = useSelector((state) => state.recipe_detail);

  if (loading) {
    return (
      <>
        <div>Cargando detalles de receta</div>
      </>
    );
  }

  return (
    <>
      <h1>{idRecipe}</h1>
      <Recipe detailed={true} {...recipe} />
    </>
  );
}

export default RecipeDetail;

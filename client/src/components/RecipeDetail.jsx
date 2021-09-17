import React from "react";
import Recipe from "./Recipe";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipeDetail } from "../actions/index";
import Layout from "./Layout";

// import { NavLink } from "react-router-dom";

function RecipeDetail(props) {
  const dispatch = useDispatch();
  const idRecipe = props.match.params.recipedetail;
  const loading = useSelector((state) => state.loading_detail);
  const recipe = useSelector((state) => state.recipe_detail);

  useEffect(() => {
    dispatch(fetchRecipeDetail(idRecipe));
  }, [dispatch, idRecipe]);

  if (loading) {
    return (
      <Layout>
        <div>Cargando detalles de receta</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Recipe detailed={true} {...recipe} />
    </Layout>
  );
}

export default RecipeDetail;

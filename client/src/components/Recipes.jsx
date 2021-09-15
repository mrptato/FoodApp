import React from "react";
import { useState } from "react";
import Recipe from "./Recipe";
import { useSelector } from "react-redux";
import Layout from "./Layout";

function Recipes() {
  const [actualPage, setActualPage] = useState(0);
  const recipesPerPage = 9;
  const lastRecipe = actualPage * recipesPerPage;
  const firstRecipe = lastRecipe - recipesPerPage;
  const loading = useSelector((state) => state.loading);
  // const error = useSelector((state) => state.error);
  // const error_message = useSelector((state) => state.error_message);
  const search = useSelector((state) => state.search);
  console.log("search de useSelector: ", search);
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
  const dishTypes = useSelector((state) =>
    state.dishtypes.find((x) => x.id === parseInt(dishOrder))
  );

  const recipesFiltered = recipes
    .filter((recipe) =>
      parseInt(dishOrder) === 0
        ? recipe
        : //para solucionar la dif de nombres entre api y bd interna
          (recipe.diets || recipe.diet_types).find(
            (x) => x.toLocaleLowerCase() === dishTypes.name.toLocaleLowerCase()
          )
    )
    .sort(sortDishes);

  // console.log("recetas filtradas: ", recipesFiltered.length);
  const totalPages = Math.ceil(recipesFiltered.length / recipesPerPage);
  // console.log("Paginas Totales: ", totalPages);

  const recipesPaged = [];
  // console.log('recipesPaged luego de array:', recipesPaged)

  for (let i = 0; i < totalPages; i++) {
    recipesPaged[i] = [];
    for (let j = 0; j < recipesPerPage; j++) {
      let position = recipesFiltered[i * recipesPerPage + j];
      if (position) {
        recipesPaged[i].push(recipesFiltered[i * recipesPerPage + j]);
      }
    }
  }
  console.log("recipesPaged:", recipesPaged);

  function takeToPage(e, index) {
    e.preventDefault();
    // console.log('clic, page: ',parseInt(page.target.name))
    setActualPage(parseInt(index));
  }

  function sortDishes(a, b) {
    let valA = (a.title || a.name).toLocaleLowerCase();
    let valB = (b.title || b.name).toLocaleLowerCase();
    if (valA > valB) return orderAz === "asc" ? 1 : -1;
    if (valA < valB) return orderAz === "asc" ? -1 : 1;
    return 0;
  }

  if (loading) {
    return (
      <Layout>
        <div>CARGANDO RECETAS</div>
      </Layout>
    );
  }
  console.log("Cantidad de recetas: ", recipes.length);
  console.log("actualPage:", actualPage);
  console.log("recipesPaged:", recipesPaged[actualPage]);
  if (recipes) {
    return (
      <Layout>
        <h1>Lista de recetas</h1>
        {recipesPaged[actualPage]?.map(function (recipe) {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
        <hr />
        <span>
          {[...Array(totalPages).keys()].map((p) => {
            return (
              <>
                <a key={p} href="#" onClick={(e) => takeToPage(e, p)}>
                  {p + 1}{" "}
                </a>{" "}
              </>
            );
          })}

          {/* {recipesPaged.map*/}
        </span>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>Lista de recetas</h1>
        <div>No hay datos para mostrar</div>
      </Layout>
    );
  }
}

//inside your return
//  <Button style={{margin: '20px'}} onClick={this.takeUserToPage}>Page + 1</Button>

export default Recipes;

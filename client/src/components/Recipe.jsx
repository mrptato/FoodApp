import React from "react";

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
    // if string it's inner, so i split it
    steps = steps.split("%%%");
  }
  // console.log("name", name);
  // console.log("diet_types", diet_types);
  if(diet_types){
    diet_types = diet_types.join(', ');
  }

  if (detailed) {
    return (
      <>
        <h2 display="inline">
          <a href={id}>{title ? title : name}</a>
        </h2>
        <img src={image} alt={"Image of " + name?.toUpperCase()} />
        <div>Resumen:</div>
        <div dangerouslySetInnerHTML={{__html: summary}}></div>
        <div>Dietas: {diets ? diets : diet_types}</div>
        <div>Score: {spoonacularScore ? spoonacularScore : score}</div>
        <div>Health: {healthScore ? healthScore : healthy}</div>
        <div>Pasos: {steps}</div>
      </>
    );
  } else {
    return (
      <>
        <h2 display="inline">
          <a href={id}>{title ? title : name}</a>
        </h2>
        <img src={image} alt={"Image of " + name?.toUpperCase()} />
        <div>Tipo de dieta: {diets ? diets : diet_types}</div>
      </>
    );
  }
}

export default Recipe;

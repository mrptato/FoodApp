import * as ACTION from '../action-types/index';
import GetAllRecipies from '../services/axiosGetAllRecipes';
import GetAllDishTypes from '../services/axiosGetAllDishTypes';
import GetRecipeDetail from '../services/axiosGetRecipeDetail';
import PostRecipe from '../services/axiosPostRecipe';

export function loadRecipes() {
    return {
        type: ACTION.LOADING_RECIPES,
    }
}

export function loadedRecipes(recipes) {
    return {
        type: ACTION.LOADED_RECIPES,
        payload: recipes,
    }
}

export function loadRecipeError(err) {
    return {
        type: ACTION.LOAD_RECIPES_ERROR,
        payload: err,
    }
}

export function fetchRecipes() {
    return (dispatch) => {
        dispatch(loadRecipes());
        GetAllRecipies()
            .then((res) => {
                dispatch(loadedRecipes(res.data));
            })
            .catch(err => dispatch(loadRecipeError(err.message)));
    }
}

export function loadRecipeDetail() {
    return {
        type: ACTION.LOADING_RECIPE_DETAIL,
    }
}

export function loadedRecipeDetail(detailedRecipe) {
    return {
        type: ACTION.LOADED_RECIPE_DETAIL,
        payload: detailedRecipe,
    }
}

export function loadRecipeDetailError(err) {
    return {
        type: ACTION.LOADED_RECIPE_DETAIL_ERROR,
        payload: err,
    }
}

export function fetchRecipeDetail(idRecipe) {
    return (dispatch) => {
        dispatch(loadRecipeDetail());
        GetRecipeDetail(idRecipe)
            .then((res) => {
                dispatch(loadedRecipeDetail(res.data))
            })
            .catch(err => dispatch(loadRecipeDetailError(err)));
    }
}

export function loadDishTypes() {
    return {
        type: ACTION.LOADING_DISHTYPES
    }
}

export function loadedDishTypes(dishtypes) {
    return {
        type: ACTION.LOADED_DISHTYPES,
        payload: dishtypes,
    }
}

export function loadDishTypesError(err) {
    return {
        type: ACTION.LOAD_DISHTYPES_ERROR,
        payload: err,
    }
}

export function fetchDishTypes() {
    return (dispatch) => {
        dispatch(loadDishTypes());
        GetAllDishTypes()
            .then((res) => {
                dispatch(loadedDishTypes(res.data));
            })
            .catch((err) => dispatch(loadDishTypesError(err.message)));
    }
}

export function addRecipe() {
    return {
        type: ACTION.ADDING_RECIPE,
    }
}

export function addedRecipe(
    { name, summary, score, healthy, steps, image, idDietType }
) {
    return {
        type: ACTION.ADDED_RECIPE,
        payload: { name, summary, score, healthy, steps, image, idDietType }
    }
}

export function addRecipeError(err) {
    return {
        type: ACTION.ADD_RECIPE_ERROR,
        payload: err,
    }
}

export function execAddRecipe(recipe) {
    return (dispatch) => {
        dispatch(addRecipe());
        PostRecipe(recipe)
            .then((res) => {
                dispatch(addedRecipe(res.data))
            })
            .catch((err) => dispatch(addRecipeError(err.message)))
    }
}

/*name,
    summary,
    score,
    healthy,
    steps,
    image,
    idDietType
    */
// import { useState } from 'react';
// import getAllRecipies from './services/axiosGetAllRecipes'
// import './App.css';
// import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import NewRecipe from './components/NewRecipe';
import { fetchRecipes, fetchDishTypes } from './actions';
import styled from "styled-components";

const colorA = '#F5E8C7';
const colorB = '#DEBA9D';
const colorC = '#9E7777';
const colorD = '#6F4C5B';
const colorW = "#ffffff";



const Divapp = styled.div`
  /* background-color: ${colorW}; */
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content:center;
  justify-content: center;
  font-size: calc(10px + 1vmin);
  color: ${colorD};
  `


function App() {
  // const [rec, setRec] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRecipes())
    dispatch(fetchDishTypes())
  }, [dispatch])

  return (

      <Divapp>
        <Switch>
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            exact
            path='/recipes'
            component={Recipes}
          />
          <Route
            exact
            path='/newrecipe'
            component={NewRecipe}
          />
          <Route
            path='/:recipedetail'
            component={RecipeDetail}
          />
        </Switch>
      </Divapp>
  );
}

export default App;

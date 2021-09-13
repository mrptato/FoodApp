// import { useState } from 'react';
// import getAllRecipies from './services/axiosGetAllRecipes'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import NewRecipe from './components/NewRecipe';
import { fetchRecipes, fetchDishTypes } from './actions';


function App() {
  // const [rec, setRec] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRecipes())
    dispatch(fetchDishTypes())
  }, [])

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route
          exact
          path='/'
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

    </div>
  );
}

export default App;

// import { useState } from 'react';
// import getAllRecipies from './services/axiosGetAllRecipes'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
// import NavBar from './components/NavBar';
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
  }, [dispatch])

  return (
    <div className="App">

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

    </div>
  );
}

export default App;

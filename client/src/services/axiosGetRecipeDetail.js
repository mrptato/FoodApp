import axios from 'axios';

const END_POINT = 'http://localhost:3001/';

async function GetRecipeDetail(idRecipe) {
    return await axios.get(END_POINT + 'recipes/' + idRecipe)
}

export default GetRecipeDetail;
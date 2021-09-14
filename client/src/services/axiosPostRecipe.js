import axios from 'axios';

const END_POINT = 'http://localhost:3001/';


//name, image, summary, score, healthy, steps, idDietType
async function PostRecipe(payload) {
    return await axios.post(END_POINT + 'recipe/', payload)
}

export default PostRecipe;
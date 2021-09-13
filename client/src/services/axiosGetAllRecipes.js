import axios from 'axios';

const END_POINT = 'http://localhost:3001/';

async function GetAllRecipies() {
  return await axios.get(END_POINT + 'recipes')
}

export default GetAllRecipies;
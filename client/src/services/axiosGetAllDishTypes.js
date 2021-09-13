import axios from 'axios';

const END_POINT = 'http://localhost:3001/';

async function GetAllDishTypes() {
  return await axios.get(END_POINT + 'types')
}

export default GetAllDishTypes;
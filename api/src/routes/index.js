require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Diet_type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const API_KEY = 'd7e80da397784de19c03f6802eb1a9c7'
const API_EP = 'https://api.spoonacular.com/recipes/';
const NUMBER = 2;

async function getRecipe(name) {
    try {
        let query = `${API_EP}complexSearch?apiKey=${API_KEY}&query=${name}&number=${NUMBER}`;
        // query += '&addRecipeInformation=true';
        const response = await axios.get(query);
        return response;
    } catch (err) {
        console.log('ERROR CON EL AXIOS: ', err);
    }
}

router.get('/:input', async function (req, res) {
    let response = {};
    let input = req.params.input;
    // if (!req.query.name) {
    //     console.log('------------------ tiene que salir')
    //     res
    //         .send('Input:', input)
    //         .status(404)
    // }
    switch (input) {
        case ('recipes'):
            try {
                response = await getRecipe(req.query.name);
                let resultados = response.data.results;
                if (resultados.length > 0) {
                    res
                        .json(resultados)
                        .status(200);
                } else {
                    console.log('No se encontraron recetas.');
                    res.status(404).send('No se encontraron recetas.')
                }
            } catch (err) {
                console.log('entro al catch, err: ', err);
                res
                    .send('Entró al catch. Error: ', err)
                    .status(404)
            }
            break;
        case ('types'):

            console.log('entre a types');
            const dietas = await Diet_type.findAll()

            res.status(200).send(dietas)
            break;
        default:
            res.status(404).send('Página no encontrada.')
            break;
    }
})


async function getRecipeById(id) {
    try {
        let query = `${API_EP}${id}/information?apiKey=${API_KEY}`;
        // query += '&addRecipeInformation=true';
        console.log('query: ', query);
        const response = await axios.get(query);
        return response;
    } catch (err) {
        console.log('ERROR CON EL AXIOS: ', err);
    }
}


router.get('/recipes/:id', async function (req, res) {
    let rec_id = req.params.id;
    if (rec_id) {
        try {
            response = await getRecipeById(rec_id);
            let resultados = response.data;
            // Desestructuro los datos necesarios para el detalle
            let { image, title, dishTypes, diets, summary, spoonacularScore, healthScore } = resultados;
            let { analyzedInstructions: [{ steps: [...completeSteps] }] } = resultados;
            let steps = [];
            for (let step of completeSteps) {
                steps.push(step.number + ' - ' + step.step);
            }
            res.send(image + '<br>' + title + '<br>' + dishTypes + '<br>' + diets + '<br>' + summary + '<br>' + spoonacularScore + '<br>' + healthScore + '<br>' + steps)
                .status(200)
        } catch (err) {
            console.error(err)
            res.status(404).send(err)
        }
    }
})



module.exports = router;

/* datos a extraer en detalle receta:
- imagen: image
- nombre: title
- tipo de plato: dishTypes
- tipo de dieta: diets
- resumen de plato: summary
- puntuacion: spoonacularScore
- nivel de comida saludable: healthScore
- pasos: analyzedInstructions.0.steps
*/


// https://api.spoonacular.com/recipes/complexSearch

// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint

//Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets

// https://api.spoonacular.com/recipes/{id}/information
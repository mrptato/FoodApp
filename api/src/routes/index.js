require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Recipe, Diet_type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const API_KEY = 'd7e80da397784de19c03f6802eb1a9c7'
const API_EP = 'https://api.spoonacular.com/recipes/';
const NUMBER = 3;

async function getRecipeAPI() {
    try {
        // let query = `${API_EP}complexSearch?apiKey=${API_KEY}&query=${name}&number=${NUMBER}`;
        let query = `${API_EP}complexSearch?apiKey=${API_KEY}&number=${NUMBER}`;
        query += '&addRecipeInformation=true';
        const response = await axios.get(query);
        let resultados_ext = response.data.results;
        const objeto = resultados_ext.map((elem) => {
            let { id, image, title, dishTypes, diets, summary, spoonacularScore, healthScore } = elem;
            let steps = [];
            if (elem.analyzedInstructions[0]) {
                let { analyzedInstructions: [{ steps: [...completeSteps] }] } = elem;
                for (let step of completeSteps) {
                    steps.push(step.number + ' - ' + step.step);
                }
            } else {
                steps = ['No existen pasos para esta receta.']
            }
            return { id, image, title, dishTypes, diets, summary, spoonacularScore, healthScore, steps }
        })
        return objeto;
    } catch (err) {
        console.log('ERROR CON EL AXIOS: ', err);
    }
}

async function getRecipeDB() {
    let recetas = await Recipe.findAll({
        include: {
            model: Diet_type,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });

    return recetas;
}

async function getAll() {
    const dataAPI = await getRecipeAPI();
    const dataDB = await getRecipeDB();
    return [...dataAPI, ...dataDB];
}

router.get('/:input', async function (req, res) {
    let input = req.params.input;
    console.log('Input:', input);
    switch (input) {
        case ('recipes'):
            try {
                const response = await getAll();

                res
                    .json(response)
                    .status(200);
                // } else {
                //     console.log('No se encontraron recetas.');
                //     res.status(404).send('No se encontraron recetas.')
                // }
            } catch (err) {
                console.log('entro al catch, err: ', err);
                res
                    .send('Entró al catch. Error: ', err)
                    .status(404)
            }
            break;
        case ('types'):
            const dietas = await Diet_type.findAll()
            res.status(200).send(dietas)
            break;
        default:
            res.status(404).send('Página no encontrada.')
            break;
    }
})

router.post('/recipe', async function (req, res) {
    try {
        const { name, summary, score, healthy, steps, idDietType } = req.body;
        console.log('-----------------idDietType:', idDietType)
        const recipe = await Recipe.create({
            name,
            summary,
            score,
            healthy,
            steps,
            idDietType, // [5,6,7]
        })

        await recipe.setDiet_types(idDietType);
        // await 
        res
            .send(req.body)
            .status(200)
    } catch (err) {
        console.log(err)
        res
            .status(404)
            .send(err)
    }
})

router.get('/recipes/:id', async function (req, res) {
    let rec_id = req.params.id.length > 6 ? req.params.id : parseInt(req.params.id);
    console.log('entre en recipes:id, con rec_id:', rec_id);
    if (rec_id) {
        try {
            response = await getAll();
            let datos = response.find((elem) => {
                return (elem.id === rec_id);
            })

            res.send(datos)
                .status(200)
        } catch (err) {
            console.error(err)
            res.status(404).send(err)
        }
    }
})

module.exports = router;



// https://api.spoonacular.com/recipes/complexSearch

// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint

//Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets

// https://api.spoonacular.com/recipes/{id}/information
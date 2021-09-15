require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { ClientBase } = require('pg');
const { Recipe, Diet_type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const API_KEY = 'fdf5ac312bfe45e08c46bf170b835291'
const API_EP = 'https://api.spoonacular.com/recipes/';
const NUMBER = 100;
const PRUEBAS_LOCALES = false;  // para no buscar en la api.
// https://api.spoonacular.com/recipes/complexSearch
let query = `${API_EP}complexSearch?apiKey=${API_KEY}&number=${NUMBER}`;
query += '&addRecipeInformation=true';

async function getRecipeAPI(name = undefined, idDetails = undefined) {
    let filtradosAPI;
    try {
        const response = await axios.get(query);
        if (name) {
            filtradosAPI = response.data.results.filter((obj) => {
                if (obj.title.toLocaleLowerCase().includes(name)) return obj;
            })
        } else filtradosAPI = response.data.results;
        if (!idDetails) {
            const recetas = filtradosAPI.map((elem) => {
                let { id, image, title, diets } = elem;
                return { id, image, title, diets };
            })
            return recetas;
        } else {
            const recetas = filtradosAPI.map((elem) => {
                let { id, image, title, diets, summary, spoonacularScore, healthScore } = elem;
                let steps = [];
                if (elem.analyzedInstructions[0]) {
                    let { analyzedInstructions: [{ steps: [...completeSteps] }] } = elem;
                    for (let step of completeSteps) {
                        steps.push(step.number + ' - ' + step.step);
                    }
                } else {
                    steps = ['No existen pasos para esta receta.']
                }
                return { id, image, title, diets, summary, spoonacularScore, healthScore, steps }
            })
            return recetas;
        }

    } catch (err) {
        return new Error('Error en el Axios');
    }
}

async function getRecipeDB(name = undefined, idDetails = undefined) {
    let filtradosDB;
    let response = await Recipe.findAll({
        include: {
            model: Diet_type,
            attributes: ['name'],
            through: { attributes: [] },
        }
    });
    if (name) {
        console.log('hay name por lo tanto filtro en getRecipeDB');
        filtradosDB = response.filter((obj) => {
            if (obj.name.toLocaleLowerCase().includes(name)) return obj;
        })
    } else filtradosDB = response;
    if (response.length === 0) return undefined;
    if (!idDetails) {
        console.log('idDetails falso, idDetails: ', idDetails);
        const recetas = filtradosDB.map((elem) => {
            let { id, image, name, diet_types } = elem;
            let auxDiet = [];
            for (let diet in diet_types) {
                auxDiet.push(diet_types[diet].name);
            }
            diet_types = auxDiet;
            return { id, image, name, diet_types };
        })
        return recetas;
    } else {
        console.log('idDetails verdadero, estoy en else de getRecipeDB, idDetails: ', idDetails);
        const recetas = filtradosDB.map((elem) => {
            let { id, image, name, diet_types, summary, score, healthy, steps } = elem;
            let auxDiet = [];
            for (let diet in diet_types) {
                auxDiet.push(diet_types[diet].name);
            }
            diet_types = auxDiet;
            if (steps.length === 0) {
                steps = ['No existen pasos para esta receta.']
            }
            return { id, image, name, diet_types, summary, score, healthy, steps }
        })
        return recetas;
    }
}

async function getAll(name, idDetails) {
    let dataAPI;
    let dataDB;
    if (PRUEBAS_LOCALES) {
        dataAPI = undefined;
        dataDB = await getRecipeDB(name, idDetails);
    } else {
        dataAPI = await getRecipeAPI(name, idDetails);
        dataDB = await getRecipeDB(name, idDetails);
    }
    if (dataDB && dataAPI) {
        return [...dataAPI, ...dataDB];
    } else if (dataDB && !dataAPI) {
        return [...dataDB];
    } else if (!dataDB && dataAPI) {
        return [...dataAPI];
    }
    return undefined;
}

router.get('/:input', async function (req, res) {
    let input = req.params.input;
    switch (input) {
        case ('recipes'):
            try {
                let response = {};
                if (req.query.name) {
                    response = await getAll(req.query.name.toLocaleLowerCase());
                } else {
                    response = await getAll();
                }
                res
                    .json(response)
                    .status(200);
            } catch (err) {
                res
                    .status(404)
                    .send('Entró al catch. Error: ', err)
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

router.get('/recipes/:id', async function (req, res) {
    let rec_id = req.params.id.length > 6 ? req.params.id : parseInt(req.params.id);
    console.log('entre en recipes:id, con rec_id:', rec_id);
    if (rec_id) {
        try {
            response = await getAll(undefined, rec_id);
            if (response) {
                let datos = response.find((elem) => (elem.id === rec_id))
                // cambiar steps
                res.send(datos)
                    .status(200)
            } else {
                res.json({ Error: 'Id incorrecto.' })
                    .status(404)
            }

        } catch (err) {
            console.error(err)
            res.status(404).send(err)
        }
    }
})

router.post('/recipe', async function (req, res) {
    try {
        const { name, image, summary, score, healthy, steps, idDietType } = req.body;
        // console.log('-----------------idDietType:', idDietType)
        const recipe = await Recipe.create({
            name,
            image,
            summary,
            score,
            healthy,
            steps,
            idDietType, // [5,6,7]
        })

        await recipe.setDiet_types(idDietType);
        res
            .send(recipe)
            .status(200)
    } catch (err) {
        console.log(err)
        res
            .status(404)
            .send(err)
    }
})



module.exports = router;



// https://api.spoonacular.com/recipes/complexSearch

// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint

//Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets

// https://api.spoonacular.com/recipes/{id}/information
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
const NUMBER = 2;
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
    // console.log('estoy en getRecipeDB con name:',name);
    // console.log('estoy en getRecipeDB con idDetails:',idDetails);
    let response = await Recipe.findAll({
        include: {
            model: Diet_type,
            attributes: ['name'],
            through: { attributes: [] },
        }
    });
    if (name) {
        filtradosDB = response.filter((obj) => {
            if (obj.name.toLocaleLowerCase().includes(name)) return obj;
        })
    } else filtradosDB = response;
    console.log('response en filtradosDB:', response)
    console.log('filtradosDB en filtradosDB:', filtradosDB)
    if (response.length === 0) return undefined;
    if (!idDetails) {
        const recetas = filtradosDB.map((elem) => {
            let { id, image, name, diet_types } = elem;
            return { id, image, name, diet_types };
        })
        return recetas;
    } else {
        const recetas = filtradosDB.map((elem) => {
            let { id, image, name, diet_types, summary, score, healthy } = elem;
            let steps = [];
            if (!elem.steps) steps = ['No existen pasos para esta receta.']
            return { id, image, name, diet_types, summary, score, healthy, steps }
        })
        return recetas;
    }
}

async function getAll(name, idDetails) {
    const dataAPI = await getRecipeAPI(name, idDetails);
    // const dataAPI = undefined;
    const dataDB = await getRecipeDB(name, idDetails);
    console.log('------------------ dataDB en getAll: ', dataDB)
    if (dataDB && dataAPI) {
        return [...dataAPI, ...dataDB];
    } else if (dataDB && !dataAPI) {
        return [...dataDB];
    } else if (!dataDB && dataAPI) {
        return [...dataAPI];
    }
    // if (dataAPI || dataAPI?.length === 0) 
    return undefined;
    // console.log('------------- dataAPI:', dataAPI);
    // return [...dataAPI];
}

router.get('/:input', async function (req, res) {
    let input = req.params.input;
    console.log('Input:', input);
    switch (input) {
        case ('recipes'):
            try {
                let response = {};
                if (req.query.name) {
                    console.log('estoy en recipes y en query name true')
                    response = await getAll(req.query.name.toLocaleLowerCase());
                } else {
                    console.log('estoy en recipes y en query name undefined')
                    response = await getAll();
                }
                res
                    .json(response)
                    .status(200);
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

router.get('/recipes/:id', async function (req, res) {
    let rec_id = req.params.id.length > 6 ? req.params.id : parseInt(req.params.id);
    console.log('entre en recipes:id, con rec_id:', rec_id);
    if (rec_id) {
        try {
            response = await getAll(undefined, rec_id);
            if (response) {
                let datos = response.find((elem) => (elem.id === rec_id))
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
        const { name, summary, score, healthy, steps, idDietType } = req.body;
        // console.log('-----------------idDietType:', idDietType)
        const recipe = await Recipe.create({
            name,
            summary,
            score,
            healthy,
            steps,
            idDietType, // [5,6,7]
        })

        await recipe.setDiet_types(idDietType);
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



module.exports = router;



// https://api.spoonacular.com/recipes/complexSearch

// Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint

//Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets

// https://api.spoonacular.com/recipes/{id}/information
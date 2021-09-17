import * as ACTION from '../action-types/index';

const initialState = {
    loading: false,
    loading_dish: false,
    loading_detail: false,
    adding_rec: false,
    adding_rec_suc: false,
    error: false,
    error_message: '',
    recipes: [],
    recipe_detail: [],
    dishtypes: [],
    search: '',
    orderAz: 'desc',
    orderHealth: 'desc',
    dishOrder: '0'
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION.LOADING_RECIPES:
            return {
                ...state, loading: true
            };
        case ACTION.LOADED_RECIPES:
            return {
                ...state,
                loading: false,
                recipes: action.payload,
            };
        case ACTION.LOAD_RECIPES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                error_message: action.payload,
            };
        case ACTION.LOADING_DISHTYPES:
            return {
                ...state,
                loading_dish: true
            };
        case ACTION.LOADED_DISHTYPES:
            return {
                ...state,
                loading_dish: false,
                dishtypes: action.payload,
            };
        case ACTION.LOAD_DISHTYPES_ERROR:
            return {
                ...state,
                loading_dish: false,
                error: true,
                error_message: action.payload,
            };
        case ACTION.LOADING_RECIPE_DETAIL:
            return {
                ...state,
                loading_detail: true
            };
        case ACTION.LOADED_RECIPE_DETAIL:
            return {
                ...state,
                loading_detail: false,

                recipe_detail: action.payload,
            };
        case ACTION.LOADED_RECIPE_DETAIL_ERROR:
            return {
                ...state,
                loading_detail: false,
                error: true,
                error_message: action.payload,
            };

        case ACTION.ADDING_RECIPE:
            return {
                ...state,
                adding_rec: true,
                error_adding: false,
            }
        case ACTION.ADDED_RECIPE:
            return {
                ...state,
                adding_rec: false,
                adding_rec_suc: true,
                error_adding: false,
                recipes: [...state.recipes, action.payload]
            }
        case ACTION.ADD_RECIPE_ERROR:
            return {
                ...state,
                adding_rec: false,
                error: true,
                error_message: action.payload,
            };
        case ACTION.SEARCH_VALUE:
            return {
                ...state,
                search: action.payload,
            }
        case ACTION.ORDER_AZ:
            return {
                ...state,
                orderAz: action.payload,
            }
        case ACTION.ORDER_DISH:
            return {
                ...state,
                dishOrder: action.payload,
            }
        case ACTION.ORDER_HEALTH:
            return{
                ...state,
                orderHealth: action.payload,
            }
        default:
            return state;
    }
}

export default rootReducer;
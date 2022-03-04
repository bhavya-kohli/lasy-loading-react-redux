import {FETCH_MOVIES,LOAD_MOVIES,ADD_MOVIES,RESET_ALL_LOADED,ADD_TO_FAVOURATE,REMOVE_FROM_FAVOURITE} from './actions';
const initialState={
    movies:[],
    favourites:[],
    allLoaded:false,
    loading:true,
    pageNumber:1,
}

function moviesReducer(state=initialState,action){
    console.log("hello")
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                movies:[...state.movies ,...action.payload.results],
                pageNumber:state.pageNumber+1,
                allLoaded:action.payload.results.length<=20?true:false,
                loading:false
            };
        case LOAD_MOVIES:
            return {...state,loading:true}
        case RESET_ALL_LOADED:
            return {
                ...state,
                allLoaded:false
            }
        case ADD_TO_FAVOURATE:
            return {
                ...state,
                favourites:[...state.favourites,action.payload]
            }
        case REMOVE_FROM_FAVOURITE:
            return {
                ...state,
                favourites:state.favourites.filter(
                    movie=>movie.id!==action.payload.id
                )
            }
        default:
            return state;
    }
}

export default moviesReducer;
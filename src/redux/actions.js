import axios from "axios"

export const FETCH_MOVIES ='GET_MOVIES';
export const LOAD_MOVIES='LOAD_MOVIES';
export const ADD_MOVIES='ADD_MOVIES';
export const RESET_ALL_LOADED='RESET_ALL_LOADED'
export const ADD_TO_FAVOURATE='ADD_TO_FAVOURITE'
export const REMOVE_FROM_FAVOURITE='REMOVE_FROM_FAVOURITE'

export const TO_FALSE='TO_FALSE'

const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = 'c6c4e60319e238d5a3fa231c71338a02';
//const PARAMS = 'page=1';
//const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;

export const fetchMovies=(pageNumber)=>{
    try{
        return async dispatch =>{
            dispatch(loadMovies())
            console.log(pageNumber)
            const PARAMS = `page=${pageNumber}`;
            const url=`${API_URL}?api_key=${API_KEY}&${PARAMS}`
            const res=await axios.get(`${url}`)
            console.log(res.data)
            if(res.data){
                dispatch(addMovies(res.data))
            }else{
                dispatch({
                    type:"ERROR",
                    error:"Error"
                })
            }
            dispatch(resetAllLoaded())
        }
    }catch(err){
        dispatch({
            type:"ERROR",
            error:"Error"
        })
    }
};


export const addMovies=(data)=>{
    return ({
        type:ADD_MOVIES,
        payload:data
    })
}


export const loadMovies=()=>{
    return ({
        type:LOAD_MOVIES
    })
}

export const add_to_favourites=movie=>dispatch=>{
    dispatch ({
        type:ADD_TO_FAVOURATE,
        payload:movie
    })
}

export const remove_from_favourites=movie=>dispatch=>{
    dispatch({
        type:REMOVE_FROM_FAVOURITE,
        payload:movie
    })
}

export const allLoadedtofalse=()=>{
    return ({
        type:TO_FALSE
    })
}

export const resetAllLoaded=()=>{
    return ({
        type:RESET_ALL_LOADED
    })
}
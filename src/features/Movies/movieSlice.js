import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',async (term) =>{
    // const movieText = "Harry";
    const response = await MovieApi
    .get(`?apiKey=${APIKey}&s=${term}&type=movie`)
   return response.data;
})

export const fetchAsyncShows = createAsyncThunk('shows/fetchAsyncShows',async (term) =>{
    // const seriesText = "Friends";
    const response = await MovieApi
    .get(`?apiKey=${APIKey}&s=${term}&type=series`)
   return response.data;
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('shows/fetchAsyncMovieOrShowDetail',async (id) =>{
    
    const response = await MovieApi
    .get(`?apiKey=${APIKey}&i=${id}&plot=full`)
   return response.data;
})

const initialState = {
    movies:{},
    shows:{},
    selectMovieOrShow:{},
    // loader:true
}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        // addMovies:(state,{payload}) => {
        //     state.movies = payload
        // }
        removeSelectedMovieOrShow : (state) =>{
            state.selectMovieOrShow = {}
        }
    },
    extraReducers:{
      [fetchAsyncMovies.pending] : () => {
          console.log("Pending");
      },
      [fetchAsyncMovies.fulfilled] : (state,{payload}) => {
          console.log("Fetched successfully!");
          return {...state,movies:payload}
      },
      [fetchAsyncMovies.rejected] : () =>{
        console.log("Rejected!");
      },
      [fetchAsyncShows.fulfilled] : (state,{payload}) => {
        console.log("Fetched successfully!");
        return {...state,shows:payload}
    },
    [fetchAsyncMovieOrShowDetail.fulfilled] : (state,{payload}) => {
        console.log("Fetched successfully!");
        return {...state,selectMovieOrShow:payload}
    },

    }
})

// export const {addMovies} = movieSlice.actions;
export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;

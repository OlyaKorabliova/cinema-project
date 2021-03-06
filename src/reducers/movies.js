import { combineReducers } from "redux"
import { assoc } from "ramda"
import {
  FETCH_MOVIES_SLUG,
  FETCH_MOVIES_SLUG_SUCCESS,
  FETCH_MOVIES_LABEL_SUCCESS,
  FETCH_SCHEDULE_MOVIES_SUCCESS,
  POST_MOVIE_SUCCESS,
  FETCH_AUTOCOMPLETE_MOVIES_SUCCESS,
  CLEAR_MOVIES_AUTOCOMPLETE,
  EDITING_MOVIE_SUCCESS,
  EDITING_MOVIE_START,
  FETCH_MOVIE_DELETE_SUCCESS,
  FETCH_UNPUBLISHED_MOVIESL_SUCCESS,
  FETCH_MOVIE_SLUG_FAIL,
} from "../helpers/actionTypes"

export const bySlug = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SLUG_SUCCESS:
    case FETCH_UNPUBLISHED_MOVIESL_SUCCESS:
      return { ...state, ...action.movies }
    case POST_MOVIE_SUCCESS:
      return { ...state, ...action.movie }
    case FETCH_MOVIE_SLUG_FAIL:
      return action
    case EDITING_MOVIE_SUCCESS:
      let newState = state
      newState[action.slugName] = action.movie
      return newState
    case FETCH_MOVIE_DELETE_SUCCESS:
      let newStateDel = { ...state }
      delete newStateDel[action.slugName]
      return newStateDel
    default:
      return state
  }
}

export const movieCount = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MOVIES_LABEL_SUCCESS:
    case FETCH_SCHEDULE_MOVIES_SUCCESS:
      // console.log("COUNT:",action,  action.metaData.count);
      return action.metaData.count
    default:
      return state
  }
}

export const allSlugs = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIES_SLUG_SUCCESS:
    case FETCH_SCHEDULE_MOVIES_SUCCESS:
    case FETCH_MOVIES_LABEL_SUCCESS:
      return [...state, ...action.slugs].filter((el, i, arr) => arr.indexOf(el) === i)
    case POST_MOVIE_SUCCESS:
      return [...state, ...action.movie]
    case FETCH_MOVIE_SLUG_FAIL:
      return action
    case FETCH_MOVIE_DELETE_SUCCESS:
      return [...state].filter(el => el !== action.slugName)
    default:
      return state
  }
}

export const labeledMovies = (state = { popular: [], soon: [] }, action) => {
  switch (action.type) {
    case FETCH_MOVIES_LABEL_SUCCESS:
      return { ...state, [action.label]: action.slugs }
    case FETCH_MOVIE_DELETE_SUCCESS:
      return [...state].filter(el => el !== action.slugName)
    default:
      return state
  }
}

export const scheduleMoviesSlugs = (state = [], action) => {
  switch (action.type) {
    case FETCH_SCHEDULE_MOVIES_SUCCESS:
      return [...action.slugs]
    case FETCH_MOVIE_DELETE_SUCCESS:
      return [...state].filter(el => el !== action.slugName)
    default:
      return state
  }
}

const unpublishedMoviesSlugs = (state = [], action) => {
  switch (action.type) {
    case FETCH_UNPUBLISHED_MOVIESL_SUCCESS:
      return [...state, ...action.slugs].filter((el, i, arr) => arr.indexOf(el) === i)
    case FETCH_MOVIE_DELETE_SUCCESS:
      return [...state].filter(el => el !== action.slugName)
    default:
      return state
  }
}

export const moviesAutocomplete = (state = [], action) => {
  switch (action.type) {
    case FETCH_AUTOCOMPLETE_MOVIES_SUCCESS:
      return [...action.movies]
    case CLEAR_MOVIES_AUTOCOMPLETE:
      return []
    default:
      return state
  }
}

export const fetching = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SLUG:
      return assoc(action.slugName, true, state)
    case EDITING_MOVIE_START:
      return assoc(action.movie, true, state)
    case FETCH_SCHEDULE_MOVIES_SUCCESS:
    case FETCH_MOVIES_LABEL_SUCCESS:
    case FETCH_MOVIE_SLUG_FAIL:
    case FETCH_MOVIES_SLUG_SUCCESS:
      return assoc(action.slugName, false, state)
    case POST_MOVIE_SUCCESS:
    case EDITING_MOVIE_SUCCESS:
      return assoc(action.movie, false, state)
    default:
      return state
  }
}

export const getAllMoviesSlugs = state => state.allSlugs

export const getUnpublishedMovies = state => state.unpublishedMoviesSlugs

export const isMovieFetchingSlug = (slugName, state) => state.fetching[slugName]

export const getLabeledMovies = (label, state) => state.labeledMovies[label]

export const getMovieBySlug = (slugName, state) => state.bySlug[slugName]

export const getMoviesAutocomplete = state => state.moviesAutocomplete

export const getMoviesCount = state => state.movies.movieCount
export default combineReducers({
  bySlug,
  movieCount,
  allSlugs,
  fetching,
  labeledMovies,
  scheduleMoviesSlugs,
  moviesAutocomplete,
  unpublishedMoviesSlugs,
})

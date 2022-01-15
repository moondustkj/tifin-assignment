import axios from 'axios'
import { toast } from 'react-toast'

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST'
export const SET_POPULAR_CONTENT_LIST = 'SET_POPULAR_CONTENT_LIST'
export const SET_LATEST_CONTENT_LIST = 'SET_LATEST_CONTENT_LIST'
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST'

const initialState = {
  moviesList: [],
  popularContentList: [],
  latestContentList: [],
  searchList: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES_LIST:
      return {
        ...state,
        moviesList: action.payload,
      }
    case SET_POPULAR_CONTENT_LIST:
      return {
        ...state,
        popularContentList: action.payload,
      }
    case SET_LATEST_CONTENT_LIST:
      return {
        ...state,
        latestContentList: action.payload,
      }
    case SET_SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload,
      }
    default:
      return state
  }
}

export const fetchMoviesList = ({ mediaType, timeWindow }) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=379a37c5026c524a117b20f313a44c30`
      )
      .then((res) => {
        dispatch({
          type: SET_MOVIES_LIST,
          payload: res.data.results,
        })
        return res.data
      })
      .catch((err) => {
        dispatch({
          type: SET_MOVIES_LIST,
          payload: [],
        })
        return err
      })
  }
}
export const fetchPopularContentList = (type) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/popular?api_key=379a37c5026c524a117b20f313a44c30`
      )
      .then((res) => {
        dispatch({
          type: SET_POPULAR_CONTENT_LIST,
          payload: res.data.results,
        })
        return res.data
      })
      .catch((err) => {
        dispatch({
          type: SET_POPULAR_CONTENT_LIST,
          payload: [],
        })
        return err
      })
  }
}
export const fetchLatestContentList = (type) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/latest?api_key=379a37c5026c524a117b20f313a44c30`
      )
      .then((res) => {
        dispatch({
          type: SET_LATEST_CONTENT_LIST,
          payload: res.data,
        })
        return res.data
      })
      .catch((err) => {
        dispatch({
          type: SET_LATEST_CONTENT_LIST,
          payload: [],
        })
        return err
      })
  }
}

export const fetchSearchResults = (searchVal) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=379a37c5026c524a117b20f313a44c30&query=${searchVal}`
      )
      .then((res) => {
        dispatch({
          type: SET_SEARCH_LIST,
          payload: res.data.results,
        })
        if (!res.data.results.length) {
          toast.info('No Results found')
        }
        return res.data.results
      })
      .catch((err) => {
        dispatch({
          type: SET_SEARCH_LIST,
          payload: [],
        })
        return err
      })
  }
}

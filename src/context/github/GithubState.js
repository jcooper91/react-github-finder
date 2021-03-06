import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer' 
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

let githubClientId 
let githubClientSecret 

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    // we have to dispatch stuff back to our reducer (github reducer)
    // So if we make a request to get users from github for example,
    // we then have to pass a type back to our reducer

    // reducer - used for storing state
    // @param1 of useReducer is a function which accepts two paraments, which are state & action...
    // This is the function within githubReducer.js... 
    // And these parameters are sent to our reducer via the dispatch function where we send type (state) and payload (action)... 
    // useReducer returns two
    const [state, dispatch] = useReducer(GithubReducer, initialState) // @1 reducer/function itself @2 initial state

    const searchUsers = async (text) => {
          setLoading()
          const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
          dispatch({
              type: SEARCH_USERS,
              payload: res.data.items
          })
      }

      const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
      }

      const getUserRepos = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
      }

     const clearUsers = () => dispatch({ type:CLEAR_USERS })

     const setLoading = () => dispatch({ type: SET_LOADING })

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                getUser,
                getUserRepos,
                clearUsers
            }}
        >
        {props.children}
        </GithubContext.Provider>
    ) 
}

export default GithubState
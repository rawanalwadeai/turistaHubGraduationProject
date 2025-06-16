//H


import { createContext, useEffect, useReducer, useState } from "react";


// const initial_State ={
// user:localStorage.getItem('user') !== undefined ?
//  JSON.parse(localStorage.getItem('user')) : null,
// loading:false,
// error:null
// }
const initial_State = {
    user: localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null
};




export const AuthContext = createContext(initial_State)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                loading: true,
                error: null
            }

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case 'REGISTER_SUCCESS':
            return {
                user: null,
                loading: false,
                error: null
            }
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null
            }

        case 'UPDATE_USER':   
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };


        default:
            return state

    }
}




export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_State)



    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])


    return <AuthContext.Provider value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
    }}>
        {children}

    </AuthContext.Provider>

}
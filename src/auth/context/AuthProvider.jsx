import { useReducer } from "react"
import { types } from "../types/types"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "./AuthReducer"

const initialState = {}

export const AuthProvider = ({ children }) => {

  const initializer = () => {
    const user = JSON.parse( localStorage.getItem('user'))

    return {
      logged: !!user,
      user: user
    }
  }
  const [authState, dispatch] = useReducer(AuthReducer, initialState, initializer)


  const login = (name = '') => {

    const user = {id: 'ABC', name}
    const action = { type: types.login, payload: user}
    localStorage.setItem('user', JSON.stringify(user))
    dispatch(action)
  }

  const logout = () => {

    localStorage.removeItem('user')
    const action = { type: types.logout }
    dispatch(action)
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login: login,
      logout: logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

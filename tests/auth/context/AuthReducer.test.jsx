import { AuthReducer } from "../../../src/auth/context/AuthReducer"
import {types} from "../../../src/auth/types/types"

describe('Pruebas en AuthReducer', () => {


  test('Debe de retornar el estado por defcto', () => {

    const newState = AuthReducer({ logged: false }, {})
    expect(newState).toEqual({ logged: false })

  })

  test('Debe de loguearse, autenticarse y establecer el usuario', () => {
    const user = {
      id: 'Hello',
      name: 'Jojoa'
    }
    const action = {
      type: types.login,
      payload: user
    }

    const newState = AuthReducer({ logged: false }, action)
    expect(newState.logged).toBeTruthy()
    expect(newState.user).toEqual(user)
    expect(newState).toEqual({
      logged: true,
      user: action.payload
    })
  })

  test('Debe de cerrar sesion, cambiar el logged a false y el name a vacio', () => {

    const state = {
      logged: true,
      user: {
        id: 'Hello',
        name: 'Jojoa'
      }
    }

    const actionLogin = {
      type: types.login,
      payload: state.user
    }

    const loginState = AuthReducer({ logged: false }, actionLogin)
    console.log(loginState);

    const actionLogout = {
      type: types.logout
    }

    const newState = AuthReducer(state, actionLogout)
    expect(newState.logged).toBeFalsy()
    expect(newState).toEqual({
      logged: false,
    })
  })
})
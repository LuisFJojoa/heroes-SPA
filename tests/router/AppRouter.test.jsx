import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context'
import { AppRouter } from '../../src/router/AppRouter'

describe('Pruebas en <AppRouter/>', () => {

  test('Debe de mostrar el login si no está autenticado', () => {

    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Login')).toBeTruthy()
  })

  test('Debe de mostrar el componente de Marvel si está autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Lucho'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('MarvelPage')).toBeTruthy()
  })
})
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages/SearchPage'

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage/>', () => {

  beforeEach(()=> jest.clearAllMocks())

  test('Debe de mostrarse correctamente con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()

  })

  test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    expect(input.value).toBe('batman')

    const img = screen.getByRole('img')
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

    const searchHero = screen.getByLabelText('search-hero')
    expect(searchHero.style.display).toContain('none')

  })

  test('Debe de mostrar un error si no se encuentra el hero (batman123)', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    const searchHero = screen.getByLabelText('no-hero')
    expect(searchHero.style.display).toContain('')
  })

  test('Debe de llamar el navigate a la pantalla nueva', () => {
    
    const inputValue = 'batman'

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('input-text')
    fireEvent.change(input, {target: {value: inputValue}})

    const form = screen.getByLabelText('form')
    fireEvent.submit(form)

    // const submitBtn = screen.getByRole('button')
    // fireEvent.click(submitBtn)
    
    expect( mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  })

})
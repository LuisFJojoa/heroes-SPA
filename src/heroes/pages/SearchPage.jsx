import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string'
import { useForm } from "../../hooks/"
import { HeroCard } from "../components/"
import { getHeroesByName } from "../helpers"

export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { q = '' } = queryString.parse(location.search)
  const heroes = getHeroesByName(q)

  const showSearch = (q.length === 0)
  const showError = (q.length > 0) && heroes.length === 0

  const { searchText, onInputChange, onResetForm } = useForm({
    searchText: q
  })

  const onSearchSubmit = (evt) => {
    evt.preventDefault();
    navigate(`?q=${searchText}`)
    // onResetForm()
  }

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form aria-label='form' onSubmit={onSearchSubmit}>
            <input
              aria-label="input-text"
              type="text"
              name="searchText"
              placeholder="Search a hero" className="form-control"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div
            aria-label='search-hero'
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div
            aria-label='no-hero'
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{q}</b>
          </div>

          {
            heroes.map((hero) => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>

      </div>
    </>
  )
}
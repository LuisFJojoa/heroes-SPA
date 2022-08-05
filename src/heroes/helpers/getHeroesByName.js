import { Heroes } from '../data/Heroes'

export const getHeroesByName = (name = '') => {

  name = name.toLocaleLowerCase().trim()
  if (name.length === 0) return []

  return Heroes.filter(heroe => heroe.superhero.toLocaleLowerCase().includes(name))

}
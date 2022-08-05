import { Heroes } from "../data/Heroes"

export const getHeroById = (id) => {

  return Heroes.find( hero => hero.id === id)
}
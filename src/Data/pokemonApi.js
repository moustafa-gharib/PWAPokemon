// src/api/pokemonApi.js

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getAllPokemons() {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=1500`
  )


  return await response.json()
}

export async function getPokemonDetails(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  return await response.json()
}
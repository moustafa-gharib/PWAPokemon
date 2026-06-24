<script setup>
import { ref, onMounted } from 'vue'
import { getAllPokemons } from '../Data/pokemonApi'

const pokemons = ref([])

onMounted(async () => {
  const data = await getAllPokemons()
  pokemons.value = data.results.slice(0, 20)
})

const getPokemonId = (url) => {
  const parts = url.split('/')
  return parts[parts.length - 2]
}
</script>

<template>
  <ul class="mdc-image-list my-image-list">
    <li 
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      class="mdc-image-list__item"
    >
      <div class="mdc-image-list__image-aspect-container">
        <img
          class="mdc-image-list__image"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`"
          :alt="pokemon.name"
        >
      </div>

      <div class="mdc-image-list__supporting">
        <span>
          {{getPokemonId(pokemon.url) }}  {{ pokemon.name }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li{
  border: 2px solid black;
}
.my-image-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  list-style: none;
  padding: 0;
  margin: 0;
}

.mdc-image-list__item {
  width: 100%;
}

.mdc-image-list__image {
  width: 100%;
  display: block;
  border-radius: 8px;
}

.mdc-image-list__supporting {
  text-align: center;
  padding: 8px;
  text-transform: capitalize;
  justify-content: center;
}
</style>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllPokemons } from '../Data/pokemonApi'

const props = defineProps({ search: String })
defineEmits(['select'])

const pokemons = ref([])
const currentPage = ref(1)
const itemsPerPage = 20

onMounted(async () => {
  try {
    const data = await getAllPokemons()
    pokemons.value = data.results
  } catch (error) {
    console.error('Fout bij ophalen Pokémon:', error)
  }
})

const getPokemonId = (url) => {
  const parts = url.split('/')
  return parts[parts.length - 2]
}

// Gefilterde lijst op basis van zoekterm
const filteredPokemons = computed(() => {
  if (!props.search) return pokemons.value
  return pokemons.value.filter(p =>
    p.name.toLowerCase().includes(props.search.toLowerCase())
  )
})

const paginatedPokemons = computed(() => {
  // Bij zoeken geen paginering tonen
  if (props.search) return filteredPokemons.value
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPokemons.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPokemons.value.length / itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="pokemon-container">

    <!-- Geen resultaten -->
    <p v-if="filteredPokemons.length === 0" class="no-results">
      Geen Pokémon gevonden voor "{{ search }}"
    </p>

    <ul class="my-image-list">
      <li
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.name"
        @click="$emit('select', getPokemonId(pokemon.url))"
      >
        <div class="mdc-card mdc-card--outlined pokemon-card">
          <div class="mdc-card__primary-action" tabindex="0">
            <div class="pokemon-media">
              <img
                class="pokemon-image"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`"
                :alt="pokemon.name"
              >
            </div>
            <div class="pokemon-content">
              <h3>#{{ getPokemonId(pokemon.url) }}</h3>
              <p>{{ pokemon.name }}</p>
            </div>
            <div class="mdc-card__ripple"></div>
          </div>
        </div>
      </li>
    </ul>

    <!-- Paginering alleen tonen als er niet gezocht wordt -->
    <div class="pagination" v-if="!search">
      <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">← Vorige</button>
      <span class="page-number">Pagina {{ currentPage }} van {{ totalPages }}</span>
      <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">Volgende →</button>
    </div>

  </div>
</template>

<style scoped>
.pokemon-container {
  padding: 60px 14px 0px 14px;
}

.no-results {
  text-align: center;
  margin-top: 40px;
  color: #777;
}

.my-image-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.my-image-list li {
  width: 100%;
  cursor: pointer;
}

.pokemon-card {
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.2s ease;
}

.pokemon-card:hover {
  transform: scale(1.03);
}

.pokemon-media {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 140px;
  padding: 16px;
}

.pokemon-image {
  width: 110px;
  height: 110px;
  object-fit: contain;
}

.pokemon-content {
  text-align: center;
  padding: 12px;
}

.pokemon-content h3 {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.pokemon-content p {
  margin-top: 8px;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
}

.pagination {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,.2), 0 8px 16px rgba(0,0,0,.15);
  z-index: 1000;
}

.page-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number {
  font-weight: 600;
}
</style>
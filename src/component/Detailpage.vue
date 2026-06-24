<script setup>
import { ref, watch } from 'vue'
import { getPokemonDetails } from '@/Data/pokemonApi'

const props = defineProps({ id: String })
const emit = defineEmits(['close'])

const pokemon = ref(null)
const visible = ref(false)

watch(() => props.id, async (newId) => {
  if (!newId) return
  pokemon.value = null
  visible.value = true
  pokemon.value = await getPokemonDetails(newId)
}, { immediate: true })

const getStatPercent = (value) => Math.round((value / 255) * 100)
const getStatColor = (value) => {
  const hue = Math.round((value / 255) * 120)
  return `hsl(${hue}, 80%, 45%)`
}

const statLabels = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  'speed': 'Speed'
}
</script>

<template>
  <section :class="['sheet', { 'sheet-visible': visible }]">

    <header class="sheet-header">
      <button class="material-icons mdc-icon-button" @click="visible = false; emit('close')">close</button>
      <h2 class="sheet-title">{{ pokemon ? `${pokemon.id}. ${pokemon.name}` : 'Laden...' }}</h2>
      <div class="header-actions">
        <button class="material-icons mdc-icon-button">share</button>
        <button class="material-icons mdc-icon-button">settings</button>
      </div>
    </header>

    <main class="sheet-main">
      <div v-if="!pokemon" class="loading">Laden...</div>

      <div v-else class="pokemon-detail">

        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-image">

        <!-- Abilities -->
        <div class="info-block">
          <h2>Abilities</h2>
          <ul class="abilities-list">
            <li v-for="item in pokemon.abilities" :key="item.ability.name">
              {{ item.ability.name }}
            </li>
          </ul>
        </div>

        <!-- Stats -->
        <div class="info-block">
          <h2>Stats</h2>
          <ul class="stats-list">
            <li v-for="item in pokemon.stats" :key="item.stat.name" class="stat-item">
              <div class="stat-header">
                <span class="stat-name">{{ statLabels[item.stat.name] || item.stat.name }}</span>
                <span class="stat-value">{{ item.base_stat }}</span>
              </div>
              <div class="stat-bar">
                <div
                  class="stat-fill"
                  :style="{
                    width: getStatPercent(item.base_stat) + '%',
                    backgroundColor: getStatColor(item.base_stat)
                  }"
                ></div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </main>

    <footer class="sheet-footer">
      <button class="material-icons mdc-icon-button">thumb_up</button>
      <button class="material-icons mdc-icon-button">favorite</button>
      <button class="material-icons mdc-icon-button">thumb_down</button>
    </footer>

  </section>
</template>

<style scoped>
.sheet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sheet-visible {
  transform: translateX(0) ;
}

.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.sheet-title {
  flex: 1;
  text-align: center;
  margin: 0;
  text-transform: capitalize;
}

.header-actions {
  display: flex;
}

.sheet-main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.loading {
  text-align: center;
  margin-top: 40px;
}

.pokemon-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
}

.info-block {
  width: 100%;
  margin-top: 20px;
}

.info-block h2 {
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}

.abilities-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.abilities-list li {
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 20px;
  text-transform: capitalize;
  font-size: 14px;
}

.stats-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.stat-item {
  margin-bottom: 12px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 14px;
}

.stat-name {
  font-weight: 600;
}

.stat-bar {
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.sheet-footer {
  display: flex;
  justify-content: space-around;
  padding: 12px;
  border-top: 1px solid #ddd;
}
</style>
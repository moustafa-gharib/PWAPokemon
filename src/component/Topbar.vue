<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchVisible = ref(false)
</script>

<template>
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">menu</button>
        <span class="mdc-top-app-bar__title">Pokemon</span>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search" @click="searchVisible = !searchVisible">search</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button>
      </section>
    </div>

    <div class="search-bar" v-show="searchVisible">
      <span class="material-icons search-icon">search</span>
      <input
        type="text"
        placeholder="Zoek een Pokémon..."
        @input="emit('search', $event.target.value)"
      >
    </div>

  </header>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin: 0 16px 12px 16px;
  background: rgba(255,255,255,0.2);
  border-radius: 24px;
  padding: 6px 16px;
  gap: 8px;
}

.search-bar input {
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  width: 100%;
}

.search-bar input::placeholder {
  color: rgba(255,255,255,0.7);
}

.search-icon {
  color: rgba(255,255,255,0.7);
}
</style>
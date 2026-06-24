<script setup>
import { ref } from 'vue'
import PokemonCard from './component/PokemonCard.vue'
import DetailPage from './component/detailpage.vue'
import Topbar from './component/Topbar.vue'

const selectedId = ref(null)
const searchQuery = ref('')
</script>

<template>
  <header>
    <Topbar @search="query => searchQuery = query" />
  </header>

  <main> 
    <PokemonCard :search="searchQuery" @select="id => selectedId = id" />
  </main>

  <DetailPage :id="selectedId" @close="selectedId = null" />
</template>
<script setup lang="ts">
import { useBaseStore } from '@/stores'
import CarsList from '../components/CarsList.vue'
import CreateCar from '@/components/CreateCar.vue'

const baseStore = useBaseStore()
</script>

<template>
  <div class="garage fade">
    <CreateCar  />
    <div v-if="baseStore.cars">
      <h2 class="green">cars in garage: {{ baseStore.cars.length }}</h2>
      <CarsList :cars="baseStore.cars"></CarsList>
    </div>
    <div v-else>
      <span class="error-text">Loading...</span>
    </div>
  </div>
</template>

<style>
.garage {
  width: 100%;
  height: 100%;
}
</style>

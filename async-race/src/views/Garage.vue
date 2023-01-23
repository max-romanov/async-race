<script setup lang="ts">

import {ref} from "vue";
import {useBaseStore} from '@/stores'
import CarsList from '../components/CarsList.vue'
import CreateCar from '@/components/CreateCar.vue'

const currentPage = ref<number>(1)

const baseStore = useBaseStore()

const getCars = () => {
  baseStore.getCars(currentPage.value, 7)
}

getCars()

</script>

<template>
  <div class="garage fade">
    <div class="garage-buttons">
      <button class="race-button" @click="baseStore.startRace()">
        <unicon name="rocket"/>
        Race
      </button>
      <button>
        <unicon name="corner-down-left" @click="baseStore.stopAll()"/>
        Reset
      </button>
    </div>
    <CreateCar/>
    <div v-if="baseStore.cars">
      <p>{{ currentPage }}</p>
      <h2 class="green">total cars in garage: {{ baseStore.cars.length }}</h2>
      <div class="change-page-buttons">
        <button title="previous page" @click="() => {
      if (currentPage !== 1) {
        currentPage--
        getCars()
      }
    }">
          <unicon name="angle-left-b"/>
        </button>
        <button title="previous page" @click="() => {
      currentPage++
      getCars()
    }">
          <unicon name="angle-right-b"/>
        </button>
      </div>
      <CarsList :cars="baseStore.currentCars"/>
    </div>
    <div v-else>
      <span class="error-text">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.garage {
  width: 100%;
  height: 100%;
}

.garage-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.change-page-buttons {
  display: flex;
  gap: 10px;
}
</style>

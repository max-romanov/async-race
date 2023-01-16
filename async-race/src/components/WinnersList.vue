<script setup lang="ts">
import { defineProps } from 'vue'
import type { IWinner } from '../interfaces/IWinner'
import { useBaseStore } from '../stores/index'
import Car from "@/components/Car.vue";

interface IProps {
  winners: IWinner[]
}

const store = useBaseStore()

const props = defineProps<IProps>()

console.log(store.getWinner(0))

console.log(this)
</script>

<template>
  <div v-if="store.cars" v-for="winner in props.winners" :key="winner.id">
    <Car :controls="false" :car-data="store.cars.find(car => car.id === winner.id)"/>
  </div>
</template>
<я></я>

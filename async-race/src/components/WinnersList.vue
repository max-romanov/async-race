<script setup lang="ts">
import type { IWinner } from '@/interfaces/IWinner'
import { useBaseStore } from '@/stores'
import Car from "@/components/Car.vue";

interface IProps {
  winners: IWinner[]
}

const store = useBaseStore()

const props = defineProps<IProps>()

</script>

<template>
  <div v-if="store.cars" v-for="winner in props.winners" :key="winner.id">
    <Car :controls="false" :car-data="store.cars.find(car => car.id === winner.id)"/>
  </div>
</template>

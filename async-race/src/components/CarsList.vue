<script setup lang="ts">
import Car from './Car.vue'
import type {IExtendedCar} from "@/interfaces/IExtendedCar";
import {useBaseStore} from "@/stores";

interface IProps {
  cars: IExtendedCar[]
}

const store = useBaseStore()

const props = defineProps<IProps>()
</script>

<template>
  <div>
    <button @click="store.startAll()">start all</button>
    <div v-for="car in props.cars" :key="car.id">
      <Car :controls="true" :car-data="car"></Car>
    </div>
  </div>
</template>

<style></style>

<script setup lang="ts">
import Car from './Car.vue'
import type {IExtendedCar} from "@/interfaces/IExtendedCar";
import {useBaseStore} from "@/stores";

interface IProps {
  cars: IExtendedCar[]
}

const props = defineProps<IProps>()
</script>

<template>
  <div>
    <div v-for="car in props.cars" :key="car">
      <Car :controls="true" :car-data="car"></Car>
    </div>
  </div>
</template>

<style></style>

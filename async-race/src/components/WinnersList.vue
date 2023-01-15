<script setup lang="ts">
import { defineProps } from 'vue'
import type { IWinner } from '../interfaces/IWinner'
import { useBaseStore } from '../stores/index'

interface IProps {
  winners: IWinner[]
}

const store = useBaseStore()

const props = defineProps<IProps>()

console.log(this)
</script>

<template>
  <div v-for="winner in props.winners" :key="winner.id">
    <h3>{{ store.garage.find((car) => car.id === winner.id).name }}</h3>
  </div>
</template>

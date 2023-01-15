<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useBaseStore } from './stores/index'

const baseStore = useBaseStore()

baseStore.setData()

console.log('awaited')

//baseStore.setCars()
</script>

<template>
  <RouterView></RouterView>
</template>

<style></style>

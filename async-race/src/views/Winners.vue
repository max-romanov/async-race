<script setup lang="ts">
import WinnersList from '@/components/WinnersList.vue'
import { useBaseStore } from '@/stores'

const baseStore = useBaseStore()
</script>

<template>
  <div v-if="baseStore.winners">
    <WinnersList :winners="baseStore.winners"></WinnersList>
  </div>
  <div v-else class="error-text-wrapper">
    <span class="error-text">error</span>
  </div>
</template>

<style></style>

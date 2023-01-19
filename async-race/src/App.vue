<script setup lang="ts">
import { RouterView, RouterLink, useRoute  } from 'vue-router'
import { useBaseStore } from './stores/index'

const baseStore = useBaseStore()

baseStore.setData()

const route = useRoute()
</script>

<template>
  <div class="main">
    <div class="links-wrapper">
      <div class="links">
        <RouterLink to="/winners">Winners</RouterLink>
        <RouterLink to="/">Garage</RouterLink>
      </div>
      {{route.name}}
    </div>
    <span v-if="baseStore.chosenCar">{{baseStore.chosenCar.name}}</span>
    <Transition>
      <RouterView></RouterView>
    </Transition>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}

.links-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /*padding: 20px;*/
  margin: 10px 0;
}

.links {
  display: flex;
  gap: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

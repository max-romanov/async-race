<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {useBaseStore} from './stores/index'

const baseStore = useBaseStore()

baseStore.setData()

const route = useRoute()
</script>

<template>
  <div class="main">
    <div class="links-wrapper">
      <div class="links">
        <RouterLink to="/winners">
          Winners
        </RouterLink>
        <RouterLink to="/">
          Garage
        </RouterLink>
      </div>
      {{ route.name }}
    </div>
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
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
  align-items: center;
  /*padding: 20px;*/
  margin: 10px 0;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.35s ease;
}

.scale-enter-from, .scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>

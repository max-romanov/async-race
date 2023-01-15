<script setup lang="ts">
import { useBaseStore } from '@/stores/'

let color: string = ''
let text: string = ''

const baseStore = useBaseStore()
</script>

<template>
  <div>
    <input class="green-input-color" type="color" v-model="color"/>
    <input class="green-input-text" placeholder="car name" type="text" v-model="text">
  </div>
</template>

<style scoped>
.green-input-text {
  border: var(--vt-c-black-mute) solid 2px;
  border-radius: 8px;
  box-shadow: none;
  outline: none;
  background: transparent;
  transition: 0.5s ease;
  color: var(--vue-green);
  padding: 8px 20px;
  margin: 5px 0;
  font-size: 22px;
  font-family: "JetBrains Mono";
}

.green-input-text::placeholder {
  color: var(--vt-c-text-dark-2)
}

.green-input-text:focus {
  border-color: var(--vue-green-darker);
  background: #282828;
}

@media (prefers-color-scheme: light) {
  .green-input-text {
    border-color: var(--vt-c-divider-dark-2);
  }

  .green-input-text:focus {
    color: var(--vue-green);
    /*background: #e2e2e2;*/
    background: transparent;
  }
}

.green-input-color {
  box-shadow: none;
  outline: none;
  border: none;
  border-radius: 50%;
  background: transparent;
  transition: 0.5s ease;
}

.green-input-text:focus {
  /*background: #282828;*/
}
</style>

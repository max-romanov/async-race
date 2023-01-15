<script setup lang="ts">
import type { ICar } from '../interfaces/ICar'

interface IProps {
  carData: ICar
}

const props = defineProps<IProps>()
</script>

<template>
  <div>
    <h3>{{ props.carData.name }}</h3>
    <div
      class="carColor"
      :style="{ backgroundColor: props.carData.color }"
    ></div>
  </div>
</template>

<style>
.carColor {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 3px 0;
}
</style>

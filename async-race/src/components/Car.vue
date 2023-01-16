<script setup lang="ts">
import type { ICar } from '../interfaces/ICar'
import {useBaseStore} from "@/stores";
import type {IExtendedCar} from "@/interfaces/IExtendedCar";

interface IProps {
  carData: IExtendedCar,
  controls?: boolean,
}

const baseStore = useBaseStore()



const props = defineProps<IProps>()

const onClick = () => {
  if (props.controls) {
    baseStore.setCurrentCar(props.carData)
  }
}
</script>

<template>
  <div class="car" :class="baseStore.chosenCar === props.carData ? 'selected' : ''" @click="onClick">
    <h3>{{ props.carData.name }}</h3>
    <div
      class="carColor"
      :style="{ backgroundColor: props.carData.color }"
    ></div>
  </div>
</template>

<style>
.car {
  margin: 5px 0;
}

.carColor {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 3px 0;
}

.selected {
  border: var(--vue-green) 3px solid;
  borde-radius: 10px;
}
</style>

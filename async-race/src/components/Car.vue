<script setup lang="ts">
import {useBaseStore} from "@/stores";
import {ref} from "vue";
import type {IExtendedCar} from "@/interfaces/IExtendedCar";

const car = ref<HTMLDivElement | null>(null)

interface IProps {
  carData: IExtendedCar,
  controls?: boolean,
}

const baseStore = useBaseStore()

const props = defineProps<IProps>()



let animeId: number | null = null

const onClick = () => {
  console.log(props.carData.id)
  if (props.controls) {
    baseStore.setCurrentCar(props.carData)
  }
  console.log(props.carData.isMoving)
}

let a = 1
const inc = Math.random()


const animate = (stamp: number) => {
  if (a < 500) {
    a += inc
  }

  if (car.value) {
    car.value.style.transform = `translateX(${a}px)`
  }

  animeId = requestAnimationFrame(animate)
}

const stopAnimate = () => {
  if (animeId) {
    cancelAnimationFrame(animeId)
  }
}

const startCar = () => {
  console.log(baseStore.cars && baseStore.cars[props.carData.id - 1])
  if (baseStore.cars && baseStore.cars[props.carData.id - 1].isMoving) {
    baseStore.stopCar(props.carData.id - 1)
    stopAnimate()
    return
  }
  baseStore.startCar(props.carData.id)
  animate(0)
}

if (props.carData.isMoving) {
  startCar()
}
</script>

<template>
  <div class="car" :class="baseStore.chosenCar === props.carData ? 'selected' : ''" @click="onClick">
    <h3>{{ props.carData.name }}</h3>
    <div
        ref="car"
      class="carColor"
      :style="{ backgroundColor: props.carData.color }"
    ></div>
    <div v-if="props.controls">
      <button @click="startCar">{{ baseStore.cars[props.carData.id - 1]?.isMoving ? "stop" : "start" }}</button>
    </div>
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
  border-radius: 10px;
}
</style>

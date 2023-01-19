<script setup lang="ts">
import {useBaseStore} from "@/stores";
import {ref, reactive} from "vue";
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
let finished = false
let inc: number | null = 1.1
const transition = ref<number>(0)

const animate = (stamp: number) => {
  // if (a < 500) {
  //   if (!inc) {
  //     return
  //   }
  //   a *= inc
  // } else {
  //   finished = true
  //   console.log(`${props.carData.name} finished; timestamp: ${new Date()}`)
  //   animeId && window.cancelAnimationFrame(animeId)
  // }
  //
  // transform.value = a
  //
  // if (!finished) {
  //   animeId = requestAnimationFrame(animate)
  // }
}

const stopAnimate = () => {
  if (animeId) {
    cancelAnimationFrame(animeId)
  }
}

const startCar = async () => {
  console.log(baseStore.cars && baseStore.cars[props.carData.id - 1])
  if (baseStore.cars && baseStore.cars[props.carData.id - 1].isMoving) {
    baseStore.stopCar(props.carData.id - 1)
    if (car.value) {
      car.value.style.transition = ""
      car.value.style.transform = ""
    }
    return
  }
  const data = await baseStore.startCar(props.carData.id)
  if (data) {
    if (car.value) {
      car.value.style.transition = (data.distance / data.velocity).toString() + "ms" + " linear"
      car.value.style.transform = `translate(${parseInt(window.getComputedStyle(document.body).width) - 100}px)`
      console.log(`translate(${parseInt(window.getComputedStyle(document.body).width) - 100}px)`)
    }
  }
}

if (/*baseStore.getCar(props.carData.id)?.isMoving*/props.carData.isMoving && props.controls) {
  console.log('alala')
  // startCar()
  requestAnimationFrame(animate)
  console.log('alala1')
}
</script>

<template>
  <div class="car" :class="baseStore.chosenCar === props.carData ? 'selected' : ''" @click="onClick">
    <h3>{{ props.carData.name }}</h3>
    <div
      class="carColor"
      ref="car"
      :style="{ backgroundColor: props.carData.color, transition: `${transition}` }"
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

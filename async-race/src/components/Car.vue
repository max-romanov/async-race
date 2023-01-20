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

let duration: number | null = null
const amountPx = window.innerWidth - 110

let animeId: number | null = null
let animation: boolean = true
let i: number = 0
let startTime: number | null = null

const animate = (timestamp: number) => {
  console.log(duration)
  if (!startTime) {
    startTime = timestamp
  }

  const runTime = timestamp - startTime

  if (duration) {
    const relProgress = runTime / duration

    const left = amountPx * Math.min(relProgress, 1)

    if (!car.value) {
      return
    }

    car.value.style.transform = `translateX(${left}px)`

    if (runTime < duration) {
      requestAnimationFrame(animate)
    }
  }
}

const onClick = () => {
  console.log(props.carData.id)
  if (props.controls) {
    baseStore.setCurrentCar(props.carData)
  }
  console.log(props.carData.isMoving)
}

const transition = ref<number>(0)

const startCar = async () => {
  if (!baseStore.cars) {
    return
  }
  if (baseStore.cars[props.carData.id - 1].isMoving) {
    return
  }
  const data = await baseStore.startCar(props.carData.id)
  if (data) {
    // console.log(data)
    // setTimeout(() => {animation = false}, data.distance / data.velocity)
    duration = data.distance / data.velocity
    requestAnimationFrame(animate)
    const a = await baseStore.driveCar(props.carData.id)
    console.log(a)
  }
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

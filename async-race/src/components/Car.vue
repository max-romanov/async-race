<script setup lang="ts">
import {useBaseStore} from "@/stores";
import {computed, ref} from "vue";
import type {IExtendedCar} from "@/interfaces/IExtendedCar";
import EditCarPopup from "@/components/EditCarPopup.vue";

const car = ref<HTMLDivElement | null>(null)

interface IProps {
  carData: IExtendedCar,
  controls?: boolean,
}

const baseStore = useBaseStore()

const props = defineProps<IProps>()

const start = computed<string>(() => {
  return props.carData.isMoving ? "Stop" : "Start"
})

let duration: number | null = null

const isMoving = baseStore.getCar(props.carData.id)?.car.isMoving

let animeId: number | null = null
let animation: boolean = true
let startTime: number | null = null

const reset = async () => {
  console.log(baseStore.getCar(props.carData.id)?.car.isMoving)
  if (
      baseStore.getCar(props.carData.id)?.car.isMoving
  ) {
    console.log("stop")
    const a = await baseStore.stopCar(props.carData.id)
    console.log(a)
  }
  duration = null
  animeId = null
  animation = false
  startTime = null
  if (car.value) {
    car.value.style.transform = ""
  }
}

const startCarButtonDisabled = ref<boolean>(false)

const animate = (timestamp: number) => {
  if (!animation) {
    return;
  }

  if (!startTime) {
    startTime = timestamp
  }

  const runTime = timestamp - startTime

  if (duration) {
    const relProgress = runTime / duration

    const left = (window.innerWidth - 100) * Math.min(relProgress, 1)

    if (!car.value) {
      return
    }

    car.value.style.transform = `translateX(${left}px)`

    if (runTime < duration) {
      animeId = requestAnimationFrame(animate)
    }
  }
}

const transition = ref<number>(0)

async function startCar() {
  if (startTime) {
    reset()
  }
  startCarButtonDisabled.value = true
  if (!baseStore.cars) {
    return
  }
  const data = await baseStore.startCar(props.carData.id)
  if (data) {
    setTimeout(() => {
      animation = false
    }, data.distance / data.velocity)
    duration = data.distance / data.velocity
    animation = true
    requestAnimationFrame(animate)

    const res = await baseStore.driveCar(props.carData.id)

    console.log(res)

    if (res && res === "Car has been stopped suddenly. It's engine was broken down.") {
      startCarButtonDisabled.value = false
      animation = false
      return
    }
    if (res && res.includes('success')) {
      startCarButtonDisabled.value = false
    }
  }
}

const deleteCar = () => {
  baseStore.removeCar(props.carData.id)
}

if (props.carData.isMoving && props.controls) {
  startCar()
}


</script>

<template>
  <div class="car" @click="onClick">
    <h3>{{ props.carData.name }}</h3>
    <div
        class="carColor"
        ref="car"
        :style="{ backgroundColor: props.carData.color, transition: `${transition}` }"
    ></div>

    <div class="car-control-buttons" v-if="props.controls">
      <button :disabled="startCarButtonDisabled" @click="() => {
        startCar()
      }">
        <unicon name="rocket"/>
        start
      </button>
      <button @click="deleteCar">
        <unicon name="car-slash"/>
        Remove
      </button>
      <edit-car-popup :car-color="props.carData.color" :car-name="props.carData.name" @submit="(newName, newColor) => {
        baseStore.updateCar(props.carData.id, newName, newColor)
      }"/>
      <button @click="reset">
        <unicon name="corner-down-left"/>
        Reset
      </button>
      {{ start }}
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

.car-control-buttons {
  display: flex;
  gap: 10px;
}

button {
  display: flex;
  align-items: center;
  gap: 5px;
}


</style>

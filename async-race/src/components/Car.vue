<script setup lang="ts">
import {useBaseStore} from "@/stores";
import {ref, computed} from "vue";
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

let animeId: number | null = null
let animation: boolean = true
let startTime: number | null = null

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

    if ((runTime < duration) && animation) {
      animeId = requestAnimationFrame(animate)
    }
  }
}

const transition = ref<number>(0)

async function startCar() {
  if (!baseStore.cars) {
    return
  }
  const data = await baseStore.startCar(props.carData.id)
  if (data) {
    setTimeout(() => {animation = false}, data.distance / data.velocity)
    duration = data.distance / data.velocity
    animation = true
    requestAnimationFrame(animate)

    const a = await baseStore.driveCar(props.carData.id)

    if (a && a === "Car has been stopped suddenly. It's engine was broken down.") {
      animation = false
    }

  }
}

const deleteCar = () => {
  baseStore.removeCar(props.carData.id)
}

if (props.carData.isMoving && props.controls) {
  startCar()
}

const stopCar = async () => {
  if (car.value) {
    await baseStore.stopCar(props.carData.id)
    animation = false
    duration = null
    startTime = null
    car.value.style.transform = `translateX(0px)`
  }
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
    {{duration}}

    <div class="car-control-buttons" v-if="props.controls">
      <button @click="startCar">
        <unicon name="rocket"/>
        {{ start }}
      </button>
      <button @click="deleteCar">
        <unicon name="car-slash"/>
        Remove
      </button>
      <edit-car-popup :car-color="props.carData.color" :car-name="props.carData.name" @submit="(newName, newColor) => {
        baseStore.updateCar(props.carData.id, newName, newColor)
      }"/>
      <button @click="stopCar">
        <unicon name="corner-down-left"/>
        Reset
      </button>
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

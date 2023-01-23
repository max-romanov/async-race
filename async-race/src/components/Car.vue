<script setup lang="ts">
import {useBaseStore} from "@/stores";
import {ref, reactive, computed} from "vue";
import type {IExtendedCar} from "@/interfaces/IExtendedCar";
import EditCarPopup from "@/components/EditCarPopup.vue";

const car = ref<HTMLDivElement | null>(null)

interface IProps {
  carData: IExtendedCar,
  controls?: boolean,
}

const engineIsBroken = ref<boolean>(false)

const baseStore = useBaseStore()

const props = defineProps<IProps>()

const start = computed<string>(() => {
  console.log(props.carData.isMoving)
  return props.carData.isMoving ? "Stop" : "Start"
})

let duration: number | null = null

let animeId: number | null = null
let animation: boolean = true
let startTime: number | null = null

const animate = (timestamp: number) => {
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

function onClick() {
  if (props.controls) {
    baseStore.setCurrentCar(props.carData)
  }
}

const transition = ref<number>(0)

async function startCar() {
  if (!baseStore.cars) {
    return
  }
  // if (baseStore.cars[props.carData.id - 1].isMoving) {
  //   return
  // }
  const data = await baseStore.startCar(props.carData.id)
  if (data) {
    console.log(data)
    setTimeout(() => {animation = false}, data.distance / data.velocity)
    duration = data.distance / data.velocity
    requestAnimationFrame(animate)

    const a = await baseStore.driveCar(props.carData.id)

    if (a && a === "Car has been stopped suddenly. It's engine was broken down.") {
      animation = false
    }

    console.log(a)
  }
}

const deleteCar = () => {
  baseStore.removeCar(props.carData.id)
}

console.log(props.carData.isMoving)

if (props.carData.isMoving && props.controls) {
  startCar()
}

const {log} = console

</script>

<template>
  <div class="car" @click="onClick">
    <h3>{{ props.carData.name }}</h3>
    <div
      class="carColor"
      ref="car"
      :style="{ backgroundColor: props.carData.color, transition: `${transition}` }"
    ></div>
<!--    <img src="../assets/car-1057.svg" alt="234" :style="{background: props.carData.color}" ref="car">-->
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
        log(newName, newColor)
        baseStore.updateCar(props.carData.id, newName, newColor)
      }"/>
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

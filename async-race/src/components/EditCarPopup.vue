<script setup lang="ts">
import {ref} from "vue";

interface IProps {
  carName: string,
  carColor: string
}

const props = defineProps<IProps>()

const open = ref<boolean>(false)

const name = ref<string>(props.carName)

const color = ref<string>(props.carColor)

</script>

<template>
  <button @click="open = true">
    <unicon name="pen"/>
    Edit
  </button>

  <Teleport to="body">
    <transition name="fade">
      <div class="modal" v-if="open">
        <h1>Edit</h1>
        <input type="text" v-model="name">
        <input type="color" v-model="color">
        <button @click="() => {
        open = false
        $emit('submit', name, color)
      }"
        >
          <unicon name="check-circle"/>
          Apply
        </button>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background: var(--color-background-soft);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (prefers-color-scheme: dark) {
  .modal {
    background: var(--vt-c-white-mute);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.35s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

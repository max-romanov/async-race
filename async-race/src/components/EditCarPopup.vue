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

const emit = defineEmits<{
  (e: 'submit', newName: string, newColor: string): void
}>()

</script>

<template>
  <button @click="open = true">
    <unicon name="pen"/>
    Edit
  </button>

  <Teleport to="body">
    <transition name="fade">
      <div class="modal" v-if="open">
        <div @click="open = false" class="close">
          <unicon width="25" height="25" name="times-circle"/>
        </div>
        <h1>Edit Car</h1>
        <input type="text" v-model="name">
        <input type="color" v-model="color">
        <button @click="() => {
        open = false
        emit('submit', name, color)
      }"
        >
          <unicon name="check-circle"/>
          Apply
        </button>
      </div>
    </transition>
  </Teleport>
</template>
1
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  width: 300px;
  background: var(--white-soft-transparent);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 8px;
  border: solid 2px var(--vue-green);
  padding: 20px;
  overflow: hidden;
}

.close {
  margin-left: auto;
  padding: 5px;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .modal {
    background: rgb(24 24 24 / 0.7);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.35s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  filter: blur(5px);
}
</style>

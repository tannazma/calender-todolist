<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Calendar + To-Dos')
const showDialog = ref(false)

const openDialog = () => (showDialog.value = true)
const closeDialog = () => (showDialog.value = false)
</script>

<template>
  <h1>{{ message }}</h1>
  <div id="vue-root"></div>
  <h3 class="monthAndYear h4"></h3>
  <div class="buttonContainer"></div>
  <div id="app-calendar"></div>
  <div class="background" id="buy-dialog" v-if="closeDialog">
    <div class="dialogBox">
      <div>
        <input class="input-task input-event" placeholder="Add your tasks or events" />
        <button @click="closeDialog" class="closeBtn btn btn-secondary">&times;</button>
        <div class="taskEvent">
          <button  class="add-task btn btn-primary btn-sm">Task</button>
          <button  class="add-event btn btn-outline-primary">Event</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

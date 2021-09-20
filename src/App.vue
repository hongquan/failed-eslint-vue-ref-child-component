<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Vue3LottieWeb from './components/Vue3LottieWeb.vue'

export default defineComponent({
  setup() {
    const bell = ref<InstanceType<typeof Vue3LottieWeb>>()

    const shakeBell = () => {
      const player = bell.value
      if (player) {
        player.stop()
        player.play()
      }
    }
    return {
      bell,
      shakeBell,
    }
  },
})
</script>

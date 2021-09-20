<template>
  <div ref='container'></div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, ref, toRefs, watch } from 'vue'
import lottie, { AnimationItem, AnimationConfigWithData } from 'lottie-web'

export default defineComponent({
  props: {
    animationData: {
      type: [Object, String] as PropType<Record<string, number | string> | string>,
      required: true,
    },
    loop: { type: [Boolean, Number] as PropType<boolean | number>, default: false },
    autoPlay: { type: Boolean, default: true },
    renderer: { type: String, default: 'svg' },
    speed: { type: Number, default: 1 },
    svgClassName: {
      type: String,
      default: '',
    },
  },
  emits: ['loop-complete', 'complete', 'enter-frame'],
  setup(props, context) {
    const container = ref<Element>()
    const player = ref<AnimationItem>()

    const init = () => {
      const settings = {
        container: container.value,
        renderer: props.renderer,
        loop: props.loop,
        autoplay: props.autoPlay,
        animationData: props.animationData,
        rendererSettings: {
          className: props.svgClassName,
        },
      } as AnimationConfigWithData
      const newPlayer = lottie.loadAnimation(settings)
      player.value = newPlayer
      newPlayer.addEventListener('loopComplete', () => {
        context.emit('loop-complete', newPlayer)
      })
      newPlayer.addEventListener('complete', () => {
        context.emit('complete', newPlayer)
      })
      newPlayer.addEventListener('enterFrame', () => {
        context.emit('enter-frame', newPlayer)
      })
      return newPlayer
    }

    const play = () => {
      if (player.value) {
        player.value.play()
      }
    }
    const pause = () => {
      if (player.value) {
        player.value.pause()
      }
    }
    const stop = () => {
      if (player.value) {
        player.value.stop()
      }
    }

    const { animationData } = toRefs(props)
    watch(animationData, () => {
      init()
    })
    onMounted(() => {
      init()
    })
    return {
      container,
      player,
      init,
      play,
      pause,
      stop,
    }
  },
})
</script>

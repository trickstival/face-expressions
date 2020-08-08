<template>
  <section class="face-expressions">
    <video
      ref="video"
      class="video"
      autoplay
    ></video>
    <emoji
      :faces="faces"
    />
    <!-- <canvas
      ref="canvas"
    /> -->
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as faceApi from 'face-api.js'
import { setupWebcam } from './media'
import Emoji from './Emoji.vue'

async function loadModels () {
  await faceApi.nets.ssdMobilenetv1.loadFromUri('/models')
  await faceApi.nets.faceExpressionNet.loadFromUri('/models')
}

export default defineComponent({
  components: {
    Emoji
  },
  setup () {
    // const canvas = ref<HTMLCanvasElement | null>(null)
    const video = ref<HTMLVideoElement | null>(null)
    const faces = ref([])

    async function getFaceDescriptions () {
      const input = video.value
      if (input === null) {
        return
      }
      const descriptions = await faceApi.detectAllFaces(input).withFaceExpressions()
      faces.value = descriptions
    }

    onMounted(async () => {
      setupWebcam(video)
      await loadModels()
      const rafLoop = async () => {
        await getFaceDescriptions()
        requestAnimationFrame(rafLoop)
      }
      rafLoop()
    })

    return {
      // canvas,
      video,
      faces
    }
  }
})
</script>

<style lang="scss" scoped>
.video {
  width: 600px;
  height: 600px;
}
</style>

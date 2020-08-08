<template>
  <section class="emoji-view">
    <div
      v-for="emoji in emojiFaces"
      :key="emoji"
    >
      {{ emoji }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    faces: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const expressionToEmoji = {
      neutral: '😐',
      happy: '😊',
      sad: '😭',
      angry: '😠',
      fearful: '😨',
      disgusted: '🤮',
      surprised: '😮'
    }
    const stats = computed(() => {
      return props.faces.map(face => {
        return face.expressions
      })
    })
    const emojiFaces = computed(() => {
      return stats.value.map(faceStats => {
        const biggestPair = Object.entries(faceStats)
          .reduce((acc, keyScorePair) => {
            if (keyScorePair[1] > acc[1]) {
              return keyScorePair
            }
            return acc
          }, ['', 0])

        return expressionToEmoji[biggestPair[0]]
      })
    })
    return {
      stats,
      emojiFaces
    }
  }
})
</script>

<style lang="scss" scoped>
.emoji-view {
  font-size: 90px;
}
</style>

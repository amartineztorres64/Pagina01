<template>
  <v-btn :color="colorB">{{ buttonText }}</v-btn>
</template>

<script>

export default {
  name: 'Tboton',
  props: {
    buttonText: String,
    colorB: String
  }
}
</script>

<template>
  <button type="button" :style="{'background-color' : colorB}">{{ buttonText }}</button>
</template>

<script>

export default {
  name: 'BotonStd',
  props: {
    buttonText: String,
    colorB: String
  }
}
</script>
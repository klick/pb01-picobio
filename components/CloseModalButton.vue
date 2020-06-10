<template>
  <img
    :src="filterCloseButtonPath"
    :class="{'filterCloseButton-navigationBar': navigationBar, 'filterCloseButton': !navigationBar}"
    @click="closeActiveOptionsList"
    class="roundButton"
  >
</template>

<script>
import filterCloseButtonPath from '~/assets/icons/filterCloseButton.svg'

export default {
  props: {
    closeModal: {
      type: Function,
      default: () => {}
    },

    navigationBar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      filterCloseButtonPath: filterCloseButtonPath
    }
  },

  methods: {
    closeActiveOptionsList() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss">
.filterCloseButton-navigationBar {
  bottom: 100px;
  @include mq($from: tablet) {
    bottom: 0;
  }
}

.filterCloseButton {
  bottom: 60px;
  @include mq($from: tablet) {
    bottom: 0;
  }
}
</style>

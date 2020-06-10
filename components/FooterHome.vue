<template>
  <div class="footerHome">
    <div class="footerHome-container">
      <nuxt-link tag="div" class="footerHome-home" to="/">
        <div class="footerHome-homeItem">
          hunger
        </div>
        <div class="footerHome-homeItem">
          durst
        </div>
      </nuxt-link>
      <BurgerNavButton v-if="navigationBar" />
    </div>
  </div>
</template>

<script>
import BurgerNavButton from '~/components/BurgerNavButton.vue'
export default {
  components: {
    BurgerNavButton
  },

  props: {
    navigationBar: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="scss">
.footerHome {
  position: fixed;
  bottom: 0;
  left: 0;
}

.footerHome-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100vw;
  border-top: 1px solid #e6e6e6;
  padding: $mainContainer-padding;
  background-color: white;
}

.footerHome-home {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;

  .footerHome-homeItem:not(:first-child) {
    margin-left: 5px;
  }
}

.footerHome-homeItem {
  @include typo-blackbox-small;
  padding: 5px;
  border: $box-border-width solid black;
}

.footerHome-home:hover {
  cursor: pointer;
  .footerHome-homeItem {
    background-color: black;
    color: white;
  }
}
</style>

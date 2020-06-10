<template>
  <section v-cloak class="index-container">
    <LocationFilter />
    <nuxt-link :src="filterLinkButtonPath" tag="img" class="roundButton index-filterLinkButton" to="/locations" />
    <BurgerNavButton />
  </section>
</template>

<script>
import LocationFilter from '~/components/LocationFilter.vue'
import BurgerNavButton from '~/components/BurgerNavButton.vue'
import filterLinkButtonPath from '~/assets/icons/filterLinkButton.svg'

export default {
  head() {
    return {
      title: 'hunger | durst',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'hungerdurst.ch - essen und trinken in Zürich'
        }
      ]
    }
  },

  components: {
    LocationFilter,
    BurgerNavButton
  },

  data() {
    return {
      filterLinkButtonPath: filterLinkButtonPath
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('fetchLocations')
    await store.dispatch('fetchStaticPages')
  },

  created() {
    this.$store.dispatch('populateActiveFilterIfItIsEmpty')
  }
}
</script>

<style lang="scss">
[v-cloak] {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.15s ease;
}
.page-enter,
.page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}

.index-filterLinkButton {
  bottom: 60px;
  @include mq($from: tablet) {
    bottom: 0;
  }
}
</style>

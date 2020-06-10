<template>
  <div v-cloak class="navigationModal-container">
    <div class="navigationModal">
      <template v-for="(staticPage, index) in staticPages">
        <nuxt-link
          v-on:click.native="onClickLocations"
          v-if="staticPage.name === 'Locations'"
          :key="index"
          to="/locations"
          tag="div"
          class="blackBox"
        >
          Locations
        </nuxt-link>
        <nuxt-link v-else :key="index" :to="{ name: 'static-slug', params: { slug: encodeURIComponent(staticPage.name) }}" tag="div" class="blackBox">
          {{ staticPage.name }}
        </nuxt-link>
      </template>
      <div class="navigationModal-closeButtonContainer">
        <CloseModalButton :navigation-bar="true" @closeModal="onCloseModal" />
      </div>
      <FooterHome />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseModalButton from '~/components/CloseModalButton.vue'
import FooterHome from '~/components/FooterHome.vue'

export default {
  head() {
    return {
      title: 'hunger | durst - navigation',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'informationen über hungerdurst.ch'
        }
      ]
    }
  },

  components: {
    CloseModalButton,
    FooterHome
  },

  data() {
    return {
      item: null
    }
  },

  computed: {
    ...mapState(['staticPages'])
  },

  async fetch({ store, params }) {
    await store.dispatch('fetchStaticPages')
  },

  methods: {
    onCloseModal() {
      this.$router.go(-1)
    },

    onClickLocations() {
      this.$store.dispatch('resetActiveFilter')
    }
  }
}
</script>

<style lang="scss">
[v-cloak] {
  opacity: 0;
}

.navigationModal-container {
  height: 100vh;
  width: 100vw;
  padding-top: 100px;
  @include mq($from: tablet) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0;
  }
}

.navigationModal {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: $mainContainer-padding;
  @include mq($from: tablet) {
    padding: $mainContainer-padding-tablet;
  }
  @include mq($from: desktop) {
    padding: $mainContainer-padding-desktop;
  }
}
</style>

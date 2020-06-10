<template>
  <div v-cloak class="location">
    <!-- <filtered-list-item v-if="location" :list-item="location" :is-selected="selectedItem" @click.native="handleClick(location)" />
    <div v-else class="location-notFound">
      This location does not exist. Are you sure that you spelled it correctly? (404)
    </div>
    <FooterHome :navigation-bar="true" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import FilteredListItem from '~/components/FilteredListItem'
// import FooterHome from '~/components/FooterHome'

export default {
  head() {
    return {
      title: `hunger | durst - ${this.location.name}`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${this.location.description}`
        }
      ]
    }
  },

  // components: { FilteredListItem, FooterHome },

  data() {
    return {
      location: '',
      selectedItem: null
    }
  },

  computed: {
    ...mapState(['list'])
  },

  async fetch({ store, params }) {
    await store.dispatch('fetchLocations')
  },

  created() {
    const decodedSlug = decodeURIComponent(this.$route.params.slug)
    this.locationBySlug(decodedSlug)
  },

  methods: {
    locationBySlug(slug) {
      if (this.list) {
        const location = this.list.find(l => l.urlSlug === slug)

        if (location) {
          this.location = location
        }
      }
    },

    handleClick(listItem) {
      if (this.selectedItem !== listItem) {
        this.selectedItem = listItem
      } else {
        this.selectedItem = {}
      }
    }
  }
}
</script>

<style lang="scss">
.location {
  padding: 0 $mainContainer-padding $mainContainer-padding;
}

.location-notFound {
  padding: 50px 25px;
}
</style>

<template>
  <div v-cloak class="locations">
    <FilteredList />
    <NewsletterSubscribe />
    <FooterHome :navigation-bar="true" />
  </div>
</template>

<script>
import FilteredList from '~/components/FilteredList.vue'
import NewsletterSubscribe from '~/components/NewsletterSubscribe.vue'
import FooterHome from '~/components/FooterHome.vue'
import { mapState } from 'vuex'

export default {
  components: {
    FilteredList,
    NewsletterSubscribe,
    FooterHome
  },

  computed: {
    ...mapState(['activeFilter', 'activeOptionsListName']),

    isVisible() {
      return this.activeOptionsListName !== 'none'
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('fetchLocations')
    await store.dispatch('fetchStaticPages')
  },

  created() {
    this.setActiveFilterDefaults()
  },

  mounted() {
    window.scrollTo(0, 0)
  },

  methods: {
    setActiveFilterDefaults() {
      if (this.activeFilter.mainCategory === '') {
        this.$store.dispatch('updateActiveFilter', {
          filterName: 'mainCategory',
          filterValue: 'hunger + durst'
        })
      }
      if (this.activeFilter.kreis === '') {
        this.$store.dispatch('updateActiveFilter', {
          filterName: 'kreis',
          filterValue: 'Zürich'
        })
      }
      if (this.activeFilter.subcategories === '') {
        this.$store.dispatch('updateActiveFilter', {
          filterName: 'subcategories',
          filterValue: 'Alles'
        })
      }
    }
  }
}
</script>

<style lang="scss">
[v-cloak] {
  opacity: 0;
}

.locations {
  @include mq($from: tablet) {
    // height: calc(100% - #{$newsletter-containerHeight});
    height: 100%;
  }
}
</style>

<template>
  <div class="options-container">
    <options-list
      v-if="$route.query.type === 'maincategory'"
      :filter-values="['hunger', 'durst', 'hunger + durst']"
      @updateActiveFilter="onUpdateActiveFilter"
      :possible-filter-values="['hunger', 'durst', 'hunger + durst']"
      filter-name="mainCategory"
    />

    <options-list
      v-else-if="$route.query.type === 'kreis'"
      :filter-values="kreiseByMainCategory"
      @updateActiveFilter="onUpdateActiveFilter"
      :possible-filter-values="kreiseAll"
      filter-name="kreis"
    />

    <options-list
      v-else-if="$route.query.type === 'subcategories'"
      :filter-values="subcategoriesByMainCategoryAndKreis"
      @updateActiveFilter="onUpdateActiveFilter"
      :possible-filter-values="subcategoriesAllByMainCategory"
      filter-name="subcategories"
    />
    </options-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import OptionsList from '~/components/OptionsList.vue'

export default {
  components: {
    OptionsList
  },

  computed: {
    ...mapState(['activeOptionsListName']),
    ...mapGetters([
      'kreiseAll',
      'kreiseByMainCategory',
      'subcategoriesByMainCategoryAndKreis',
      'subcategoriesAllByMainCategory'
    ])
  },

  mounted() {
    window.scrollTo(0, 0)
  },

  methods: {
    onUpdateActiveFilter(filterObject) {
      this.$store.dispatch('updateActiveFilter', filterObject)
      switch (filterObject.filterName) {
        case 'mainCategory': {
          this.$store.dispatch('resetActiveKreisAndSubcategoriesFilters')
          break
        }
        case 'kreis': {
          this.$store.dispatch('resetActiveSubcategoriesFilters')
          break
        }
        default: {
          break
        }
      }
      this.$store.dispatch('updateActiveOptionsListName', 'none')
    }
  }
}
</script>

<style lang="scss">
.options-container {
  width: 100%;
  height: 100%;
  background-color: white;
  @include mq($from: tablet) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 10px;
  }
}
</style>

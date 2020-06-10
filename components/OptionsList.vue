<template>
  <div class="optionsList-container">
    <template v-for="(filterValue, index) in possibleFilterValues">
      <div
        v-if="existsForFilters(filterValue)"
        :key="index"
        :class="{active: isActive(filterValue)}"
        @click="updateActiveFilter({ filterName: filterName, filterValue: filterValue })"
        class="blackBox"
      >
        {{ filterValue }}
      </div>
      <div
        v-else
        :key="index"
        class="optionsList-greyBox"
      >
        {{ filterValue }}
      </div>
    </template>
    <CloseModalButton @closeModal="onCloseModal" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseModalButton from '~/components/CloseModalButton.vue'

export default {
  components: {
    CloseModalButton
  },

  props: {
    filterName: {
      type: String,
      default: ''
    },
    filterValues: {
      type: Array,
      default: () => []
    },
    possibleFilterValues: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapState(['activeFilter'])
  },

  methods: {
    updateActiveFilter(filterObject) {
      this.$emit('updateActiveFilter', filterObject)
      this.$store.dispatch('updateActiveOptionsListName', 'none')
      this.$router.push({
        path: '/'
      })
    },

    onCloseModal() {
      this.$router.push({
        path: '/'
      })
    },

    isActive(filterValue) {
      return this.activeFilter[this.filterName] === filterValue
    },

    existsForFilters(filterValue) {
      return this.filterValues.includes(filterValue)
    }
  }
}
</script>

<style lang="scss">
.optionsList-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
  padding-bottom: 160px;
  @include mq($from: tablet) {
    height: 100%;
    padding: 0;
    padding-left: $mainContainer-padding-tablet;
  }
  @include mq($from: desktop) {
    padding-left: $mainContainer-padding-desktop;
  }
}

.optionsList-greyBox {
  @include typo-blackbox;
  color: #b9b9b9;
  background-color: #ebebeb;

  padding: calc(5px + #{$box-border-width});
  margin-bottom: 10px;
}
</style>

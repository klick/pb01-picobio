<template>
  <div class="filteredList">
    <div class="filteredList-container">
      <filtered-list-item v-for="(listItem, index) in filteredList" :key="index" :list-item="listItem" :is-selected="selectedItem" @click.native="handleClick(listItem)" />
      <div class="filler" />
      <div class="filler" />
    </div>
  </div>
</template>

<script>
import FilteredListItem from '~/components/FilteredListItem'
import { mapGetters } from 'vuex'

export default {
  components: {
    FilteredListItem
  },

  data() {
    return { selectedItem: null }
  },

  computed: {
    ...mapGetters(['filteredList'])
  },

  methods: {
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
.filteredList {
  min-height: 100%;
  padding-bottom: 60px;
}

.filteredList-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 14px;

  @include mq($from: tablet) {
    padding: 0 20px;
  }
  @include mq($from: desktop) {
    padding: 0 30px;
  }
}

.filler {
  flex: 1 1 375px;
  padding: 0;
  height: 0;
  padding: 10px;
}
</style>

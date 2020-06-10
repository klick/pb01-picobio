<template>
  <div class="footerFilter">
    <div class="navbar-container">
      <div class="navbar-linkList">
        <div @click="updateActiveOptionsListName('mainCategory')" class="navbar-linkListItem navbar-linkListItemMain">
          {{ activeFilter['mainCategory'] }}
        </div>
        <div @click="updateActiveOptionsListName('kreis')" class="navbar-linkListItem navbar-linkListItemKreis">
          {{ activeFilter['kreis'] ? activeFilter['kreis'] : kreiseByMainCategory[0] }}
        </div>
        <div @click="updateActiveOptionsListName('subCategory')" class="navbar-linkListItem navbar-linkListItemSub">
          {{ activeFilter['subcategories'] ? activeFilter['subcategories'] : subcategoriesByMainCategoryAndKreis[0] }}
        </div>
      </div>
      <BurgerNavButton />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BurgerNavButton from '~/components/BurgerNavButton.vue'

export default {
  components: {
    BurgerNavButton
  },

  computed: {
    ...mapState(['activeFilter']),
    ...mapGetters([
      'filteredList',
      'kreiseByMainCategory',
      'subcategoriesByMainCategoryAndKreis'
    ])
  },

  methods: {
    updateActiveOptionsListName(optionsListName) {
      this.$store.dispatch('updateActiveOptionsListName', optionsListName)
    }
  }
}
</script>

<style lang="scss">
.footerFilter {
  width: 100vw;
  position: fixed;
  bottom: 0;
}

.navbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: $navbar-height;
  border-top: 1px solid #e6e6e6;
  padding: 0 $mainContainer-padding;
  background-color: white;
}

.navbar-linkList {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  max-width: calc(100% - 35px);

  .navbar-linkListItem:not(:first-child) {
    margin-left: 5px;
  }
}

.navbar-linkListItem {
  @include typo-blackbox-small;
  padding: 5px;
  border: $box-border-width solid black;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  @include mq($from: desktop) {
    @include hoverableBackground;
  }
}

.navbar-linkListItem:hover {
  @include hoverableBackgroundOnHover;
}

.navbar-linkListItemMain {
  flex-shrink: 1;
}

.navbar-linkListItemKreis {
  flex-shrink: 0;
}

.navbar-linkListItemSub {
  flex-shrink: 5;
}

.navbar-burgerNavigationButton {
  margin-left: auto;
}
</style>

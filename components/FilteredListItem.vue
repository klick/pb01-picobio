<template>
  <div class="filteredListItem-container">
    <div class="filteredListItem">
      <div :class="{'filteredListItem-alwaysVisible-open': isSelected == listItem && isSelected !== null}" class="filteredListItem-alwaysVisible">
        <div class="filteredListItem-name">
          {{ listItem.name }}
        </div>
        <div class="filteredListItem-description">
          {{ listItem.description }}
        </div>
        <div class="filteredListItem-kreis">
          {{ listItem.kreis }}
        </div>
      </div>

      <transition name="toggle-details" mode="out-in">
        <div v-show="isSelected == listItem && isSelected !== null" class="filteredListItem-detailsContainer">
          <div class="filteredListItem-productsContainer">
            Bio Produkte
            <ul v-for="(product, index) in listItem.products" :key="index" class="filteredListItem-productsList">
              <li>
                {{ product }}
              </li>
            </ul>
          </div>
          <div class="filteredListItem-subcategoriesContainer">
            <div class="filteredListItem-subcategoriesFlexContainer">
              <template v-for="(subcategory, index) in listItem.subcategoriesEating">
                <div :key="index" class="filteredListItem-subcategoriesItem">
                  {{ subcategory }}
                </div>
              </template>
              <template v-for="(subcategory, index) in listItem.subcategoriesDrinking">
                <div :key="index" class="filteredListItem-subcategoriesItem">
                  {{ subcategory }}
                </div>
              </template>
            </div>
          </div>
          <div class="filteredListItem-contactBoxesContainer">
            <a v-if="listItem.mapLink" :href="listItem.mapLink" class="filteredListItem-contactBox" target="_blank" rel="noopener noreferrer">
              <img src="~assets/icons/googleMapsIcon.svg" alt="Google Maps Icon">
              maps
            </a>
            <a v-if="listItem.instagram" :href="listItem.instagram" class="filteredListItem-contactBox" target="_blank" rel="noopener noreferrer">insta</a>
            <a v-if="listItem.website" :href="listItem.website" class="filteredListItem-contactBox" target="_blank" rel="noopener noreferrer">menu</a>
          </div>
        </div>
      </transition>
      <div class="filteredListItem-arrowContainer">
        <img :class="{'filteredListItem-arrow-expanded': isSelected === listItem && isSelected !== null}" src="~assets/icons/toggleListItem.svg" class="filteredListItem-arrow">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `hunger | durst - ${this.listItem.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.listItem.description}`
        }
      ]
    }
  },

  props: {
    listItem: {
      type: Object,
      default: () => {}
    },
    isSelected: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    updateActiveOptionsListName(optionsListName) {
      this.$store.dispatch('updateActiveOptionsListName', optionsListName)
    }
  }
}
</script>

<style lang="scss">
.filteredListItem-container {
  flex: 1 1 375px;
  height: auto;
  padding-top: 22px;
  @include mq($from: tablet) {
    padding: 0 20px;
    padding-top: 30px;
  }
  @include mq($from: desktop) {
    padding: 0 30px;
    padding-top: 50px;
  }
}

.filteredListItem {
  position: relative;
  border: $box-border-width solid black;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  transition: all 0.3s;
}

.filteredListItem:hover {
  cursor: pointer;
}

.filteredListItem-alwaysVisible {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
  @include mq($from: tablet) {
    min-height: 150px;
  }
}

.filteredListItem-name {
  @include typo-list-name;
  margin-top: 11px;
}

.filteredListItem-description {
  @include typo-text;
  margin-top: 8px;
}

.filteredListItem-kreis {
  margin-top: auto;
  @include typo-list-kreis;
  padding-top: 8px;
}

.filteredListItem-productsContainer {
  @include typo-text;
  margin-top: 20px;
}

.filteredListItem-productsList {
  margin-top: 6px;
  list-style: none;
}

.filteredListItem-productsList > li::before {
  content: '•';
  display: inline-block;
  width: 1.3em;
  margin-left: -1.9em;
}

.filteredListItem-subcategoriesContainer {
  margin-top: 25px;
}

.filteredListItem-subcategoriesFlexContainer {
  @include typo-list-subcategories;

  // NOTE: we re-add the margin to the subcategoriesItem
  // so if we flex-wrap we still have a margin
  margin-top: -8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.filteredListItem-subcategoriesItem {
  @include mq($from: desktop) {
    @include hoverableBackground;
  }
  margin-top: 10px;
  padding: 5px;
  margin-right: 10px;
  border: solid $box-border-width black;
}

.filteredListItem-contactBoxesContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  margin-top: 25px;
}

.filteredListItem-contactBox {
  @include typo-list-linkbox;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 2px 12px;
  height: 35px;
  text-decoration: none;
  color: white;
  > img {
    margin-right: 7px;
  }
}

.toggle-details-enter-active {
  animation: expand 0.3s;
  animation-timing-function: linear;
}
.toggle-details-leave-active {
  animation: expand 0.3s reverse;
  animation-timing-function: linear;
}

.filteredListItem-arrowContainer {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.filteredListItem-arrow {
  transition: all 0.1s ease;
}

.filteredListItem-arrow-expanded {
  transform: rotateZ(180deg);
}

@keyframes expand {
  0% {
    max-height: 0px;
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    max-height: 350px;
    opacity: 1;
  }
}
</style>

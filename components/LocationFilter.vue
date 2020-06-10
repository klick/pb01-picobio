<template>
  <div class="locationFilterAndModal-container">
    <div class="locationFilter-container">
      <div class="locationFilter-textBlock">
        <div class="locationFilter-lineContainer">
          <p>Ich habe</p>
          <nuxt-link
            v-on:click.native="updateActiveOptionsListName('mainCategory')"
            :to="{path: 'options',
                  query: { type: 'maincategory' } }"
            tag="div"
            class="locationFilter-blackBox locationFilter-blackBoxRight"
          >
            {{ activeFilter['mainCategory'] }}
          </nuxt-link>
        </div>
        <div class="locationFilter-lineContainer">
          <p v-if="activeFilter['kreis'] === 'Zürich'">
            und möchte in
          </p>
          <p v-else>
            und möchte im
          </p>
          <nuxt-link
            v-on:click.native="updateActiveOptionsListName('kreis')"
            :to="{path: 'options',
                  query: { type: 'kreis' } }"
            tag="div"
            class="locationFilter-blackBox locationFilter-blackBoxRight"
          >
            {{ activeFilter['kreis'] }}
          </nuxt-link>
        </div>
        <div class="locationFilter-lineContainer">
          <nuxt-link
            v-if="activeFilter.mainCategory !== 'hunger + durst'"
            v-on:click.native="updateActiveOptionsListName('subCategory')"
            :to="{path: 'options',
                  query: { type: 'subcategories' } }"
            tag="div"
            class="locationFilter-blackBox locationFilter-blackBoxLeft"
          >
            {{ activeFilter['subcategories'] }}
          </nuxt-link>
          <p>
            {{ eatOrDrinkVerb() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['activeFilter', 'activeOptionsListName'])
  },

  methods: {
    eatOrDrinkVerb() {
      switch (this.activeFilter.mainCategory) {
        case 'hunger + durst': {
          return 'essen und trinken.'
        }
        case 'durst': {
          return 'trinken.'
        }
        default: {
          return 'essen.'
        }
      }
    },

    updateActiveOptionsListName(optionsListName) {
      this.$store.dispatch('updateActiveOptionsListName', optionsListName)
    }
  }
}
</script>

<style lang="scss" scoped>
.locationFilter-container {
  position: fixed;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 45px;
  overflow: hidden;
  @include mq($from: tablet) {
    justify-content: flex-start;
    margin-left: $mainContainer-padding-tablet;
    width: calc(80vw - #{$mainContainer-padding-tablet});
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @include mq($from: desktop) {
    margin-left: $mainContainer-padding-desktop;
    width: calc(80vw - #{$mainContainer-padding-desktop});
  }
}

.locationFilter-lineContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0.9em 0;
}

.locationFilter-textBlock {
  @include typo-location-filter-text();
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  @include mq($until: tablet) {
    padding-bottom: 80px;
  }
  @include mq($until: phone) {
    margin-bottom: 60px;
  }
}

.locationFilter-blackBox {
  @include typo-location-filter-text();
  border: $box-border-width solid black;
  padding: 0.4em 0.4em;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-transform: capitalize;
  @include mq($from: desktop) {
    @include hoverableBackground;
  }

  @include mq($from: phablet) {
    padding: 0.2em 0.2em;
    border: 0.1em solid black;
  }
}

.locationFilter-blackBox:hover {
  @include hoverableBackgroundOnHover;
}

.locationFilter-blackBoxRight {
  @include typo-location-filter-text();
  margin-left: 0.7em;
}
.locationFilter-blackBoxLeft {
  @include typo-location-filter-text();
  margin-right: 0.7em;
}
</style>

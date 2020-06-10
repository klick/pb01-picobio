<template>
  <div v-cloak class="staticPage">
    <div class="staticPage-content">
      <div class="staticPage-name">
        {{ name }}
      </div>
      <div class="staticPage-text">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="richText" />
        <div v-if="this.$route.path.includes('Impressum')" class="staticPage-bioSuisseLogoContainer">
          <img class="staticPage-bioSuisseLogo" src="~/assets/images/biosuisse.jpg">
        </div>
      </div>
      <FooterHome :navigation-bar="true" />
    </div>
    <NewsletterSubscribe />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import FooterHome from '~/components/FooterHome.vue'
import NewsletterSubscribe from '~/components/NewsletterSubscribe.vue'

export default {
  head() {
    return {
      title: `hunger | durst - ${this.name}`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${this.text}`
        }
      ]
    }
  },

  components: {
    FooterHome,
    NewsletterSubscribe
  },

  data() {
    return {
      decodedSlug: '',
      name: '',
      text: ''
    }
  },

  computed: {
    ...mapState(['staticPages']),
    richText() {
      return documentToHtmlString(this.text)
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('fetchLocations')
    await store.dispatch('fetchStaticPages')
  },

  created() {
    const decodedSlug = decodeURIComponent(this.$route.params.slug)
    this.staticPageBySlug(decodedSlug)
  },

  methods: {
    staticPageBySlug(slug) {
      if (this.staticPages) {
        const staticPage = this.staticPages.find(page => page.name === slug)

        if (staticPage && staticPage.name && staticPage.text) {
          this.name = staticPage.name
          this.text = staticPage.text
        } else {
          this.name = 'not found'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.staticPage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.staticPage-content {
  height: 100%;
  padding: $mainContainer-padding;
  margin-bottom: $mainContainer-padding;

  @include mq($from: tablet) {
    padding: $mainContainer-padding-tablet;
    margin-bottom: $mainContainer-padding-tablet;
  }
  @include mq($from: desktop) {
    padding: $mainContainer-padding-desktop;
    margin-bottom: $mainContainer-padding-desktop;
  }
}

.staticPage-name {
  @include typo-static-name;
  margin-top: 50px;
  @include mq($from: tablet) {
    margin-top: 100px;
  }
}

.staticPage-text {
  @include typo-static-text;
  max-width: 530px;
  margin-top: 14px;
  @include mq($from: tablet) {
    margin-top: 25px;
  }
  @include mq($from: desktop) {
    margin-top: 60px;
  }
  p {
    margin-bottom: 14px;
  }
  a {
    color: black;
  }
  a:hover {
    color: gray;
  }
}

.staticPage-bioSuisseLogoContainer {
  margin-top: 50px;
  @include mq($from: tablet) {
    margin-top: 100px;
  }
}

.staticPage-bioSuisseLogo {
  max-height: 100px;
}
</style>

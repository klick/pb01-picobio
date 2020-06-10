/* eslint-disable nuxt/no-cjs-in-config */
const contentful = require('contentful')
const pkg = require('./package')
require('dotenv').config()

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,

    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_POST_TYPE_ID: process.env.CTF_POST_TYPE_ID
  },
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'application-name', content: 'hungerdurst.ch' },
      {
        name: 'google-site-verification',
        content: 'FWWrQ9m6W5ka6MUe3ho_3sAuc9JFhGtDrm7GMsNwRx8'
      },
      {
        name: 'description',
        content:
          'Leckeres Essen in Zürich. Wo gibt es feines Essen und tolle Getränke in der grössten Stadt der Schweiz?'
      },
      {
        property: 'og:title',
        content: 'hunger und durst'
      },
      {
        property: 'og:description',
        content:
          'Leckeres Essen in Zürich. Wo gibt es feines Essen und tolle Getränke in der grössten Stadt der Schweiz?'
      },
      {
        property: 'og:image',
        content: 'https://hungerdurst.ch/icon.png'
      },
      {
        property: 'og:url',
        content: 'https://hungerdurst.ch'
      },

      {
        property: 'twitter:title',
        content: 'hunger und durst'
      },
      {
        property: 'twitter:description',
        content:
          'Leckeres Essen in Zürich. Wo gibt es feines Essen und tolle Getränke in der grössten Stadt der Schweiz?'
      },
      {
        property: 'twitter:image',
        content: 'https://hungerdurst.ch/icon.png'
      },
      {
        property: 'twitter:card',
        content: 'hungerdurst logo'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/typo.scss',
    '@/assets/scss/main.scss',
    '@/assets/scss/fonts.scss',
    '@/assets/scss/fluid-font-size.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ ssr: false, src: '~plugins/gmaps.js' }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap',
    ['nuxt-matomo', { matomoUrl: '//prism.y7k.com/', siteId: 30 }]
  ],

  styleResources: {
    scss: [
      '~assets/scss/typo.scss',
      '~assets/scss/main.scss',
      '~assets/scss/fonts.scss',
      '~assets/scss/fluid-font-size.scss'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },

  generate: {
    /*
    ** Fallback to SPA-mode if no route matches
    */
    fallback: true,
    /*
    ** Fetch dynamic routes
    */
    routes: () => {
      const client = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
      })

      return client
        .getEntries({
          content_type: 'location'
        })
        .then(entries => {
          return [
            ...entries.items.map(entry => `/location/${entry.fields.urlSlug}`)
          ]
        })
    }
  }
}

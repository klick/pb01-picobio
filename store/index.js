import { createClient } from '~/plugins/contentful.js'
import { uniq, orderBy, compact } from 'lodash'

export const state = () => {
  return {
    list: [],
    staticPages: [],
    activeFilter: {
      mainCategory: '',
      kreis: '',
      subcategories: ''
    },
    activeOptionsListName: 'none'
  }
}

const client = createClient()

export const actions = {
  async fetchLocations(context) {
    await client
      .getEntries({
        content_type: 'location',
        order: 'fields.name'
      })
      .then(response => {
        if (response.items.length > 0) {
          context.commit('FETCH_LOCATIONS', response.items)
        }
      })
      .catch(function(e) {
        // eslint-disable-next-line no-console
        console.log(e.message)
      })
  },

  async fetchStaticPages(context) {
    await client
      .getEntries({
        content_type: 'staticPage'
      })
      .then(response => {
        if (response.items.length > 0) {
          context.commit('FETCH_STATIC_PAGES', response.items)
        }
      })
      .catch(function(e) {
        // eslint-disable-next-line no-console
        console.log(e.message)
      })
  },

  updateActiveFilter({ commit }, filterObject) {
    commit('UPDATE_FILTER', filterObject)
  },

  resetActiveFilter({ commit }) {
    commit('RESET_FILTER')
  },

  updateActiveOptionsListName({ commit, getters }, activeOptionsListName) {
    commit('UPDATE_ACTIVE_OPTIONS_LIST_NAME', activeOptionsListName)
    commit('POPULATE_ACTIVE_FILTER_IF_IT_IS_EMPTY', getters)
  },

  resetActiveKreisAndSubcategoriesFilters({ commit }) {
    commit('RESET_ACTIVE_KREIS_AND_SUBCATEGORIES_FILTERS')
  },

  resetActiveSubcategoriesFilters({ commit }) {
    commit('RESET_ACTIVE_SUBCATEGORIES_FILTERS')
  },

  populateActiveFilterIfItIsEmpty(context) {
    context.commit('POPULATE_ACTIVE_FILTER_IF_IT_IS_EMPTY', context.getters)
  }
}

export const mutations = {
  POPULATE_ACTIVE_FILTER_IF_IT_IS_EMPTY(state, getters) {
    const mainCategory = state.activeFilter.mainCategory
      ? state.activeFilter.mainCategory
      : 'hunger'
    state.activeFilter.mainCategory = mainCategory

    const kreis = state.activeFilter.kreis
      ? state.activeFilter.kreis
      : getters.kreiseByMainCategory[0]
    state.activeFilter.kreis = kreis

    const subCategory = state.activeFilter.subcategories
      ? state.activeFilter.subcategories
      : 'Alles'
    state.activeFilter.subcategories = subCategory
  },

  FETCH_LOCATIONS(state, locations) {
    state.list = locations.map(location => {
      return {
        name: location.fields.name,
        mainCategory: location.fields.mainCategory,
        kreis: location.fields.kreis,
        subcategories: location.fields.subcategories,
        description: location.fields.description,
        products: location.fields.products,
        mapLink: location.fields.mapLink,
        instagram: location.fields.instagram,
        website: location.fields.website,
        urlSlug: location.fields.urlSlug,
        subcategoriesDrinking: location.fields.subcategoriesDrinking,
        subcategoriesEating: location.fields.subcategoriesEating
      }
    })
  },

  FETCH_STATIC_PAGES(state, pages) {
    const sortedPages = orderBy(pages, 'fields.orderNumber')
    state.staticPages = sortedPages.map(page => {
      return {
        name: page.fields.name,
        text: page.fields.text
      }
    })
  },

  UPDATE_FILTER(state, filterObject) {
    const filterName = filterObject.filterName
    const filterValue = filterObject.filterValue
    state.activeFilter[filterName] = filterValue
  },

  RESET_FILTER(state) {
    state.activeFilter = {
      mainCategory: '',
      kreis: '',
      subcategories: ''
    }
  },

  UPDATE_ACTIVE_OPTIONS_LIST_NAME(state, activeOptionsListName) {
    state.activeOptionsListName = activeOptionsListName
  },

  RESET_ACTIVE_KREIS_AND_SUBCATEGORIES_FILTERS(state) {
    state.activeFilter.kreis = ''
    state.activeFilter.subcategories = ''
  },

  RESET_ACTIVE_SUBCATEGORIES_FILTERS(state) {
    state.activeFilter.subcategories = ''
  }
}

export const getters = {
  filteredList: state => {
    if (state.list.length > 0) {
      return state.list.filter(location => {
        if (
          matchingMainCategory(location, state.activeFilter.mainCategory) &&
          filterKreis(location.kreis, state.activeFilter.kreis) &&
          filterSubcategories(location, state.activeFilter.subcategories)
        ) {
          return true
        }
        return false
      })
    } else {
      return state.list
    }
  },

  kreiseAll: state => {
    if (state.list.length > 0) {
      const kreise = state.list.map(location => location.kreis)
      const kreiseWithDefault = ['Zürich'].concat(kreise.sort(sortAlphaNum))
      return uniq(kreiseWithDefault)
    } else {
      return []
    }
  },

  kreiseByMainCategory: state => {
    if (state.list.length > 0) {
      const locationsList = state.list.filter(location => {
        if (matchingMainCategory(location, state.activeFilter.mainCategory)) {
          return true
        }
        return false
      })

      const kreise = locationsList.map(location => location.kreis)
      const kreiseWithDefault = ['Zürich'].concat(kreise.sort(sortAlphaNum))
      return uniq(kreiseWithDefault)
    } else {
      return []
    }
  },

  subcategoriesAllByMainCategory: state => {
    if (state.list.length > 0) {
      const locationsList = state.list.filter(location => {
        if (matchingMainCategory(location, state.activeFilter.mainCategory)) {
          return true
        }
        return false
      })
      const subcategoriesDrinking = locationsList.reduce(
        (subcategoriesDrinkingArray, elem) =>
          subcategoriesDrinkingArray.concat(
            removeWhitespaceFromElements(elem.subcategoriesDrinking)
          ),
        []
      )
      const subcategoriesEating = locationsList.reduce(
        (subcategoriesEatingArray, elem) =>
          subcategoriesEatingArray.concat(
            removeWhitespaceFromElements(elem.subcategoriesEating)
          ),
        []
      )
      const subcategories = subcategoriesDrinking.concat(...subcategoriesEating)
      const subcategoriesWithDefault = ['Alles'].concat(
        subcategories.sort(sortAlphaNum)
      )
      return compact(uniq(subcategoriesWithDefault))
    } else {
      return []
    }
  },

  subcategoriesByMainCategoryAndKreis: state => {
    if (state.list.length > 0) {
      const locationsList = state.list.filter(location => {
        if (
          matchingMainCategory(location, state.activeFilter.mainCategory) &&
          filterKreis(location.kreis, state.activeFilter.kreis)
        ) {
          return true
        }
        return false
      })
      const subcategoriesDrinking = locationsList.reduce(
        (arr, elem) =>
          arr.concat(removeWhitespaceFromElements(elem.subcategoriesDrinking)),
        []
      )
      const subcategoriesEating = locationsList.reduce(
        (arr, elem) =>
          arr.concat(removeWhitespaceFromElements(elem.subcategoriesEating)),
        []
      )
      const subcategories = () => {
        if (state.activeFilter.mainCategory === 'hunger') {
          return subcategoriesEating
        } else if (state.activeFilter.mainCategory === 'durst') {
          return subcategoriesDrinking
        } else {
          return subcategoriesDrinking.concat(...subcategoriesEating)
        }
      }
      const subcategoriesWithDefault = ['Alles'].concat(
        subcategories().sort(sortAlphaNum)
      )
      return compact(uniq(subcategoriesWithDefault))
    } else {
      return []
    }
  }
}

const matchingMainCategory = (location, filterMainCategory) => {
  const isDrinking =
    location.subcategoriesDrinking !== undefined &&
    filterMainCategory === 'durst'
  const isEating =
    location.subcategoriesEating !== undefined &&
    filterMainCategory === 'hunger'

  if (filterMainCategory === 'hunger + durst' || isDrinking || isEating) {
    return true
  } else {
    return false
  }
}

const filterKreis = (locationKreis, filterKreis) => {
  if (
    locationKreis === filterKreis ||
    filterKreis === 'Zürich' ||
    filterKreis === ''
  ) {
    return true
  }
  return false
}

const filterSubcategories = (location, filterSubcategory) => {
  if (
    (location.subcategoriesDrinking &&
      location.subcategoriesDrinking.includes(filterSubcategory)) ||
    (location.subcategoriesEating &&
      location.subcategoriesEating.includes(filterSubcategory)) ||
    filterSubcategory === 'Alles' ||
    filterSubcategory === ''
  ) {
    return true
  }
  return false
}

const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })

const removeWhitespaceFromElements = arr => {
  if (arr) {
    return arr.map(el => el.trim())
  }
}

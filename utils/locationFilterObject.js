const filterObj = {
  _mainCategory: undefined,
  _kreis: 0
  // _kitchenType: undefined
}

Object.defineProperty(filterObj, 'mainCategory', {
  enumerable: true,
  get() {
    return this._mainCategory
  },
  set(newVal) {
    this._mainCategory = newVal
  }
})

Object.defineProperty(filterObj, 'kreis', {
  enumerable: true,
  get() {
    return this._kreis
  },
  set(newVal) {
    this._kreis = newVal
  }
})

// Object.defineProperty(filterObj, 'kitchenType', {
//   enumerable: true,
//   get() {
//     return this._kitchenType
//   },
//   set(newVal) {
//     this._kitchenType = newVal
//   }
// })

export default filterObj

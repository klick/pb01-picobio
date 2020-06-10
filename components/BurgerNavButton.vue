<template>
  <div class="burgerNavButton-container">
    <nuxt-link class="burgerNavButton" to="/navigation">
      <img src="~/assets/icons/burgerNavButton.svg">
    </nuxt-link>
  </div>
</template>

<style lang="scss">
.burgerNavButton-container {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  padding: $mainContainer-padding;
}

.burgerNavButton {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 30px;
  width: 30px;
}
</style>

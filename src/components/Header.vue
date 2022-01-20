<template>
  <div class="header">
    <div class="header-text">
      <p class="header-title">Star Wars People Database</p>
    </div>
  </div>
</template>

<script>
  export default { name: 'Header' };
</script>

<style scoped>
@font-face {
  font-family: starWarsFont;
  src: url('~@/assets/headerFont.ttf');
}

.header {
  width: 100%;
}

.header-title {
  font-family: starWarsFont;
  color: white;
}
</style>

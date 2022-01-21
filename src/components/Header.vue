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

p {
  margin-top: 3vh;
}

.header-title {
  font-family: starWarsFont;
  color: white;
  font-size: clamp(1.1rem, 5vw, 3rem);
}
</style>

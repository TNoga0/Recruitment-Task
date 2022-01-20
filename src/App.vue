<template>
  <div id="app">
    <Header/>
    <APIGetter/>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import APIGetter from '@/components/data_handlers/APIGetter';

  export default { components: { APIGetter, Header } };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html {
  background-color: #202020;
  height: 100vh;
  width: 100%;
}

</style>

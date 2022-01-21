<template>
  <div class="edit-page">
    {{$route.params.id}}
  </div>
</template>

<script>
export default {
  name: "EditPage"
}
</script>

<style scoped>

.edit-page {
  color: white;
  background-color: lime;
  width: 20px;
  height: 50px;
}

</style>

<template>
  <div class="edit-button">
    <button type="button">Edit</button>
  </div>
</template>

<script>
  export default { name: 'EditButton' };
</script>

<style scoped>

.edit-button {
  display: grid;
  place-items: center;
}

button {
  width: clamp(5rem, 10vw, 10rem);
  margin-right: clamp(0rem, 2vw, 1rem);
  height: 3.5vh;
  background-color: #484646;
  color: white;
  border: none;
  font-size: clamp(1rem, 2vh, 1.5rem);
  border-radius: 5vw;
}

</style>

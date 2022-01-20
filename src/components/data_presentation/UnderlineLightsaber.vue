<template>
  <div class="lightsaber">
    <div class="hilt"/>
    <div class="blade"/>
  </div>
</template>

<script>
export default {
  name: "UnderlineLightsaber",
}
</script>

<style scoped>

.hilt {
  height: 0.5rem;
  width: 5rem;
  background-color: red;
  border-radius: 5px 0 0 5px;
  background-image: linear-gradient(
    to right,
    silver 0 35%,
    #b97b7b 35% 60%,
    silver 60% 65%,
    black 65% 70%,
    silver 70% 75%,
    black 80% 85%,
    silver 85% 100%
  );
}

.blade {
  display: block;
  width: 15rem;
  height: 0.5rem;
  background-color: white;
  border-radius: 0 5px 5px 0;
  box-shadow: inset 0 0 0.2rem limegreen, 0 0 0.6rem 3px limegreen, 0 0 1.1rem limegreen, 0 0 1.4rem 2px limegreen;
}

.lightsaber {
  display: flex;
}

</style>

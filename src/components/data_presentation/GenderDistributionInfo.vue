<template>
  <div class="gender-distribution">
    Men: {{menCount}} Women: {{womenCount}}
  </div>
</template>

<script>
  export default {
    name: 'GenderDistributionInfo',
    props: {
      menCount: Number,
      womenCount: Number,
    },
  };
</script>

<style scoped>

</style>

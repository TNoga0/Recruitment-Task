<template>
  <div class="gender-distribution">
    <p>Men: {{menCount}} <span/> Women: {{womenCount}}</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'GenderDistributionInfo',
    computed: {
      ...mapState([
        'menCount',
        'womenCount',
      ]),
    },
  };
</script>

<style scoped>

p {
  margin: 2vh 0 3vh 0;
  font-size: clamp(0.7rem, 5vw, 2rem);
}

span {
  margin: 5vw;
}

</style>

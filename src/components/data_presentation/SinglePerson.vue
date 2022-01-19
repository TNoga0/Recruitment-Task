<template>
  <div class="single-person" :style="cssVars">
    {{personData.name}}
  </div>
</template>

<script>
  export default {
    name: 'SinglePerson',
    props: { personData: Object },
    data() {
      return {};
    },
    computed: {
      cssVars() {
        return { '--color': this.personData.eye_color };
      },
    },
  };
</script>

<style scoped>

.single-person {
  color: var(--color);
}

</style>

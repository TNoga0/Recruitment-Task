<template>
  <div class="single-person" :style="cssVars">
    {{personData.name}} {{personData.eye_color}}
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
      eyeColor() {
        const { eye_color, ...rest } = this.personData;
        if (eye_color.split(',').length === 1 && eye_color.split('-').length === 1) {
          switch (eye_color) {
          case 'hazel':
            return 'brown';
          case 'unknown':
            return 'white';
          default:
            return eye_color;
          }
        }
        else if (eye_color.split(',').length > 1) {
          return eye_color.split(',')[0];
        }
        else if (eye_color.split('-').length > 1) {
          return eye_color.split('-')[0];
        }
      },
      cssVars() {
        return { '--color': this.eyeColor };
      },
    },
  };
</script>

<style scoped>

.single-person {
  display: flex;
  justify-content: space-around;
  margin: auto;
  padding-top: 0.9vh;
  font-size: clamp(0.7rem, 5vw, 2rem);
  /*color: var(--color);*/
  /*text-shadow: 0 0 5px var(--color);*/
  text-shadow:
    0 0 7px #fff,
    0 0 10px var(--color),
    0 0 20px var(--color);
  color: white;
  width: 70vw;
  height: 4vh;
}

</style>

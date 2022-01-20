<template>
  <div class="single-person" :style="cssVars">
    <p class="dark-text-outline"
       v-if="eyeColor === 'black'">
      {{personData.name}}
    </p>
    <p v-else>{{personData.name}}</p>
  </div>
</template>

<script>
  import { eyeColors } from '@/components/data_handlers/replacement_data.json';

  export default {
    name: 'SinglePerson',
    props: { personData: Object },
    data() {
      return { punctuationSymbols: [',', '-'] };
    },
    computed: {
      eyeColor() {
        const { eye_color, ...rest } = this.personData;
        let symbolSplits = [];
        let colorToReturn = '';
        this.punctuationSymbols.forEach((symbol, index) => {
          symbolSplits.push(eye_color.split(symbol));
          if (symbolSplits[index].length > 1) {
            colorToReturn = eye_color.split(symbol)[0];
          }
        });
        if (symbolSplits[0].length === 1 && symbolSplits[1].length === 1) {
          return Object.keys(eyeColors).includes(eye_color) ? eyeColors[eye_color] : eye_color;
        }
        return colorToReturn;
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
  font-size: clamp(0.7rem, 7vw, 2rem);
  color: var(--color);
  /*text-shadow: 0 0 5px var(--color);*/
  /*text-shadow:*/
  /*  0 0 7px #fff,*/
  /*  0 0 10px var(--color),*/
  /*  0 0 20px var(--color);*/
  /*color: white;*/
  width: 70vw;
  height: 4vh;
}

.dark-text-outline {
  text-shadow: 0 0 1px yellow, 0 0 1px yellow, 0 0 1px yellow;
}

</style>

<template>
    <div :class="{ 'lightsaber-effect': lightsaberToggled, 'no-effect': !lightsaberToggled }"
         :style="cssVars">
      <p class="dark-text-outline"
         v-if="eyeColor === 'black'">
        {{personData.name}}
      </p>
      <p v-else>
        {{personData.name}}
      </p>
    </div>
</template>

<script>
  import { eyeColors } from '@/components/data_handlers/replacement_data.json';
  import { mapState } from 'vuex';

  export default {
    name: 'PersonName',
    props: { personData: Object },
    data() {
      return { punctuationSymbols: [',', '-'] };
    },
    computed: {
      eyeColor() {
        /**
         * It's a bit ugly and hardcode-ish way to properly extract eye color. I've wanted to use
         * standard CSS colors, so some of them, like hazel, had to be replaced. The swaps are hardcoded
         * in JSON file. Also, some colors contained , or - marks and there were two colors present.
         * I've decided to take only the first one.
         */
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
      someVar() {
        return 'blue';
      },
      ...mapState([
        'lightsaberToggled',
      ]),
    },
  };
</script>

<style scoped>

p {
  margin: 0;
}

.no-effect, .lightsaber-effect {
  margin: auto;
  font-size: clamp(0.6rem, 7vw, 2rem);
  width: 70vw;
}

.no-effect {
  display: inline-block;
  color: var(--color);
}

.lightsaber-effect {
  text-shadow:
    0 0 5px #fff,
    0 0 7px var(--color),
    0 0 12px var(--color),
    0 0 23px var(--color);
  color: white;
}

.dark-text-outline {
  text-shadow: 0 0 1px yellow, 0 0 1px yellow, 0 0 1px yellow;
}

</style>

<template>
  <div class="lightsaber" :style="cssVars">
    <label class="hilt" for="saber-switch"/>
    <input type="checkbox"
           id="saber-switch"
           v-on:click="toggleLightsaber">
    <div class="blade"/>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'UnderlineLightsaber',
    methods: {
      ...mapMutations([
        'toggleLightsaber',
      ]),
    },
    computed: {
      ...mapState([
        'lightsaberToggled',
      ]),
      cssVars() {
        return { '--saber-color': 'cyan' };
      },
    },
  };
</script>

<style scoped>

#saber-switch {
  width: 0;
  height: 0;
  position: absolute;
}

.hilt {
  cursor: pointer;
  height: clamp(0.4rem,2.5vw,1rem);
  width: clamp(5rem,10vw,9rem);
  /*width: 20%;*/
  background-color: red;
  border-radius: 1vw 0 0 1vw;
  background-image: linear-gradient(
    to right,
    silver 0 35%,
    #b97b7b 35% 55%,
    silver 55% 65%,
    black 65% 70%,
    silver 70% 75%,
    black 75% 80%,
    silver 80% 83%,
    black 83% 86%,
    silver 90% 100%
  );
}

.blade {
  width: 75%;
  height: clamp(0.4rem,2.5vw,1rem);
  background-color: white;
  border-radius: 0 1vw 1vw 0;
  box-shadow: inset 0 0 0.2rem var(--saber-color),
              0 0 0.6rem 3px var(--saber-color),
              0 0 1.1rem var(--saber-color),
              0 0 1.4rem 2px var(--saber-color);

  transition: transform 90ms ease-out;
  transform-origin: left;
}

.lightsaber {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 2.5rem;
}

/* Turn lightsaber on/off */

#saber-switch:checked + .blade {
  transform: scaleX(1);
}
#saber-switch:not(:checked) + .blade{
  transform: scaleX(0);
}

</style>

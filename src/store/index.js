import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'https://swapi.dev/api/people/',
    lightsaberToggled: false,
    peopleData: {},
    menCount: 0,
    womenCount: 0,
  },
  plugins: [createPersistedState()],
  mutations: {
    toggleLightsaber(state) { state.lightsaberToggled = !state.lightsaberToggled; },
    updatePeopleData(state, newData) {
      Object.keys(newData).forEach(key => {
        // Vue.set used for reactivity
        Vue.set(state.peopleData, key, newData[key]);
      });
    },
    updateCounts(state, [men, women]) { state.menCount = men; state.womenCount = women; },
  },
  actions: {},
  modules: {},
});

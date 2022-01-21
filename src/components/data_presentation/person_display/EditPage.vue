<template>
  <div class="edit-page">
    <div class="edit-page-header">
      <div class="back-button">
        <router-link v-if="id !== undefined" :to="{ name: 'Home' }">
          <button type="button"
                  v-text="'Back'"/>
        </router-link>
      </div>

        <h1>{{person.name}}</h1>
    </div>

    <div class="person-form">
      <form>
        <div class="form-field-pair"
             v-for="property in personProperties"
             :key="property">
          <label for="property">{{ property | prettyProperty }}</label>
          <input type="text"
                 id="property"
                 v-model="person.birth_year === '19BBY' && person.gender === 'female' ? person[property]  : ''">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'EditPage',
    data() {
      return {
        id: this.$route.params.id,
        person: {},
      };
    },
    methods: {
      getAdditionalData(urls, property) {
        if (Array.isArray(urls)) {
          let results = [];
          urls.forEach(url => {
            this.$http.get(url)
              .then((response) => { property === 'films' ?
                results.push(response.data.title) :
                results.push(response.data.name); })
              .catch((error) => {});
          });
          this.$set(this.person, property, results);
        }
        else {
          this.$http.get(urls)
            .then((response) => {
              property === 'films' ?
                this.person[property] = response.data.title :
                this.$set(this.person, property, response.data.name);
            })
            .catch((error) => {});
        }
      },
    },
    computed: {
      ...mapState([
        'peopleData',
      ]),
      personProperties() {
        return Object.keys(this.person);
      },
    },
    filters: {
      prettyProperty(property) {
        let splitProperty = property.split('_').join(' ');
        return splitProperty.charAt(0).toUpperCase() + splitProperty.slice(1);
      },
    },
    beforeMount() {
      this.person = Object.assign({}, this.peopleData[this.id]);
    },
    mounted() {
      this.getAdditionalData(this.person.homeworld, 'homeworld');
      this.getAdditionalData(this.person.species, 'species');
      this.getAdditionalData(this.person.starships, 'starships');
      this.getAdditionalData(this.person.vehicles, 'vehicles');
      this.getAdditionalData(this.person.films, 'films');
    },
  };
</script>

<style scoped>

input {
  display: inline-block;
}

.edit-page {
  color: white;
}

.person-form {
  margin: auto;
  max-width: 70vw;
}

label {
  margin-bottom: 0.4rem;
}

input {
  height: clamp(1rem, 3vh, 2.5rem);
  border-radius: 10px;
  border: 0;
  font-size: clamp(0.5rem, 4vw, 1.5rem);
}

.form-field-pair {
  display: grid;
  margin-bottom: 1rem;
  font-size: clamp(0.6rem, 5vw, 2rem);
}

.edit-page-header {
  display: flex;
  justify-content: space-between;

  margin: auto;
  width: 70vw;
}

h1 {
  font-size: clamp(0.6rem, 6vw, 2rem);;
  width: 80%;
  padding-right: 10%;
}

button {
  cursor: pointer;
  height: 3.5vh;
  background-color: #3d3a3a;
  color: white;
  border: none;
  font-size: clamp(1rem, 1.5vh, 1.5rem);
  width: clamp(3rem, 10vw, 10rem);
  border-radius: 2vw;
}

.back-button {
  display: grid;
  place-items: center;
}

</style>

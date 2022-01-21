<template>
  <div class="api-getter">
    <GenderDistributionInfo/>
    <UnderlineLightsaber/>
    <SinglePerson v-for="id in Object.keys(peopleData)"
                  :key="id"
                  :person-data="peopleData[id]"
                  :person-i-d="id"
                  v-if="Object.keys(peopleData).length > 0"/>
    <h1 v-if="errorFlag">The data couldn't be loaded</h1>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  import GenderDistributionInfo from '@/components/data_presentation/GenderDistributionInfo';
  import UnderlineLightsaber from '@/components/data_presentation/UnderlineLightsaber';
  import SinglePerson from '@/components/data_presentation/person_display/SinglePerson';

  export default {
    name: 'APIGetter',
    components: {SinglePerson, UnderlineLightsaber, GenderDistributionInfo },
    data() {
      return {
        menCount: 0,
        womenCount: 0,
        errorFlag: false,
      };
    },
    methods: {
      getPeopleData(url) {
        /**
         * Performs the GET request and performs data filtering:
         * - omits people whose names start with L, N or C
         * - selects only men and women, i.e. People records with specified gender
         * Finally writes filtered data to vuex.
         * The function runs recursively until page limit reached or 100 records achieved
         */
        this.$http.get(url)
          .then((response) => {
            this.filterData(response.data.results);
            this.updateCounts([this.menCount, this.womenCount]);
            if (response.data.next !== null && (this.womenCount + this.menCount <= 100)) this.getPeopleData(response.data.next);
          })
          .catch(err => this.errorFlag = true);
      },
      filterData(dataArray) {
        /**
         * Gathers all filtering methods
         */
        const nameFilteredData = dataArray.filter(this.nameFilter);
        const onlyPeopleData = nameFilteredData.filter(this.peopleFilter);
        const orderedData = this.addIDs(onlyPeopleData);
        this.updatePeopleData(orderedData);
      },
      nameFilter(recordObject) {
        return !(['l', 'n', 'c'].includes(recordObject.name.charAt(0)
          .toLowerCase()));
      },
      addIDs(dataArray) {
        /**
         * Pulls ID from every person data and uses it as a key for key/value pairs in vuex
         */
        let objectToReturn = {}
        dataArray.forEach((dataObj) => {
          const id = dataObj.url.split('/').at(-2);
          objectToReturn[id] = dataObj
        });
        return objectToReturn;
      },
      peopleFilter(recordObject) {
        /**
         * Filters people based on gender.
         * I've decided to assign hermaphrodite (e.g. Jabba) to both male and female.
         * Can be adjusted if needed.
         */
        switch (recordObject.gender) {
        case 'male':
          this.menCount++;
          break;
        case 'female':
          this.womenCount++;
          break;
        case 'hermaphrodite':
          this.menCount++;
          this.womenCount++;
          break;
        default:
          console.log(`${recordObject.name} is not a human or of non-binary gender`);
          break;
        }
        return recordObject.gender !== 'n/a';
      },
      ...mapMutations([
        'updatePeopleData',
        'updateCounts',
      ]),
    },
    computed: {
      ...mapState([
        'apiUrl',
        'peopleData',
      ]),
    },
    mounted() {
      /**
       * The most convenient way of pulling data - at mount.
       */
      if (Object.keys(this.peopleData).length === 0) this.getPeopleData(this.apiUrl);
    },
  };
</script>

<style scoped>

.api-getter {
  color: white;
}

</style>

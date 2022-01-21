<template>
  <div class="api-getter">
    <GenderDistributionInfo/>
    <UnderlineLightsaber/>
    <SinglePerson v-for="id in Object.keys(peopleData)"
                  :key="id"
                  :person-data="peopleData[id]"
                  :person-i-d="id"/>
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
      };
    },
    methods: {
      getPeopleData(url) {
        this.$http.get(url)
          .then((response) => {
            this.filterData(response.data.results);
            this.updateCounts([this.menCount, this.womenCount]);
            if (response.data.next !== null && (this.womenCount + this.menCount <= 100)) this.getPeopleData(response.data.next);
          });
      },
      filterData(dataArray) {
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
        let objectToReturn = {}
        dataArray.forEach((dataObj) => {
          const id = dataObj.url.split('/').at(-2);
          objectToReturn[id] = dataObj
        });
        return objectToReturn;
      },
      peopleFilter(recordObject) {
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
      if (Object.keys(this.peopleData).length === 0) this.getPeopleData(this.apiUrl);
    },
  };
</script>

<style scoped>

.api-getter {
  color: white;
}

</style>

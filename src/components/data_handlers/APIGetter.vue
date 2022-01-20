<template>
  <div class="api-getter">
    <GenderDistributionInfo/>
    <UnderlineLightsaber/>
    <PersonName v-for="person in peopleData"
                  :key="person.url"
                  :person-data="person"/>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  import PersonName from '@/components/data_presentation/PersonName';
  import GenderDistributionInfo from '@/components/data_presentation/GenderDistributionInfo';
  import UnderlineLightsaber from '@/components/data_presentation/UnderlineLightsaber';

  export default {
    name: 'APIGetter',
    components: { UnderlineLightsaber, GenderDistributionInfo, PersonName },
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
            if (response.data.next !== null) this.getPeopleData(response.data.next);
          });
      },
      filterData(dataArray) {
        const nameFilteredData = dataArray.filter(this.nameFilter);
        const onlyPeopleData = nameFilteredData.filter(this.peopleFilter);
        this.updatePeopleData(onlyPeopleData);
      },
      nameFilter(recordObject) {
        return !(['l', 'n', 'c'].includes(recordObject.name.charAt(0)
          .toLowerCase()));
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
      if (this.peopleData.length === 0) this.getPeopleData(this.apiUrl);
    },
  };
</script>

<style scoped>

.api-getter {
  color: white;
}

</style>

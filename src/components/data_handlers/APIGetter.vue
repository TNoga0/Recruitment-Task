<template>
  <div class="api-getter">
    <SinglePerson v-for="person in peopleData"
                  :key="person.url"
                  :person-data="person"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import SinglePerson from '@/components/data_presentation/SinglePerson';

  export default {
    name: 'APIGetter',
    components: { SinglePerson },
    data() {
      return {
        peopleData: [],
        peopleTotalCount: 0,
        menCount: 0,
        womenCount: 0,
      };
    },
    methods: {
      getPeopleData(url) {
        this.$http.get(url)
          .then((response) => {
            this.filterData(response.data.results);
            if (response.data.next !== null) this.getPeopleData(response.data.next);
          });
      },
      filterData(dataArray) {
        const nameFilteredData = dataArray.filter(this.nameFilter);
        const onlyPeopleData = nameFilteredData.filter(this.peopleFilter);
        this.peopleData = this.peopleData.concat(onlyPeopleData);
      },
      nameFilter(recordObject) {
        return !(['l', 'n', 'c'].includes(recordObject.name.charAt(0)
          .toLowerCase()));
      },
      peopleFilter(recordObject) {
        return recordObject.gender !== 'n/a';
      },
    },
    computed: {
      ...mapState([
        'apiUrl',
      ]),
    },
    mounted() {
      this.getPeopleData(this.apiUrl);
      console.log(this.peopleData);
    },
  };
</script>

<style scoped>

.api-getter {
  color: white;
}

</style>

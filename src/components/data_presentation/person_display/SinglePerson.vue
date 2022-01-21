<template>
  <div class="single-person">
    <PersonName :person-data="personData"/>
    <EditButton/>
  </div>
</template>

<script>
  import PersonName from '@/components/data_presentation/person_display/PersonName';
  import EditButton from '@/components/data_presentation/person_display/EditButton';

  export default {
    name: 'SinglePerson',
    components: { EditButton, PersonName },
    props: { personData: Object },
  };
</script>

<style scoped>

.single-person {
  display: flex;
  margin: auto auto 1.5vh auto;
  background-color: #332f2f;
  border-radius: 15px;
  width: 90%;
  height: clamp(0.9rem, 9vw, 2.8rem);
}

</style>

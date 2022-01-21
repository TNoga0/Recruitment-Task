import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/data_handlers/APIGetter'),
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('@/components/data_presentation/person_display/EditPage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

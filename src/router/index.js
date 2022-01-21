import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/APIGetter'),
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('@/views/EditPage'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

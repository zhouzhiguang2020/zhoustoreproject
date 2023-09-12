import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout/layout.vue';
// 静态路由页面
export const allowRouter = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('../views/HelloWorld.vue')
    
  }
];
const router = ({
  history: createWebHashHistory(), // createWebHistory
  routes: allowRouter as RouteRecordRaw[]
});
router.beforeEach((to, from, next) => {
  // console.log('router', to, from);
  next();
  if (!to.meta) {
    to.meta = {}
    }
});
export default router;
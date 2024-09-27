import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',  // 默认重定向到登录页
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },  // 需要验证登录的路由
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫，检查用户是否已登录
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');  // 简单的模拟登录状态
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // 如果路由需要认证，但用户未登录，重定向到登录页
    next('/login');
  } else {
    next();  // 否则正常放行
  }
});

export default router;

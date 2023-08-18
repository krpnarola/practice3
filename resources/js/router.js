
import { createRouter, createWebHistory } from 'vue-router'
import store from "./store";
import axios from 'axios';

// import home from '@/components/home.vue'
import home from '@/components/Home.vue'
import Blog from '@/components/Blog.vue'
import Profile from '@/components/ProfilePage.vue'
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
// import Login from "../views/Login";
// import Posts from "../views/Posts";

const  routes = [
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/blog',
          name: 'blog',
          component: Blog
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: "/login",
          name: "Login",
          component: Login,
          meta: { guest: true },
        },
        {
          path: "/register",
          name: "Register",
          component: Register,
          meta: { guest: true },
        },
        // {
        //   path: '/contact',
        //   name: 'contact',
        //   component: contact
        // }
      ];

const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
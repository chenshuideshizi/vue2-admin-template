import VueRouter from 'vue-router'
import Vue from  'vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        alias: '/',
        meta: {},
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {},
        component: () => import('@/views/about/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {},
        component: () => import('@/views/login/index.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
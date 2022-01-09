import VueRouter from 'vue-router'
import Vue from  'vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        alias: '/',
        meta: {},
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/about',
        meta: {},
        component: () => import('@/views/about/index.vue')
    },
    {
        path: '/login',
        meta: {},
        component: () => import('@/views/login/index.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
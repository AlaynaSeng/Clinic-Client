import {createRouter, createWebHistory} from "vue-router"
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            name:'login',
            component: () => import('../views/Login.vue')
        },
        {
            path:'/patients',
            name:'patients',
            component: () => import('../views/patients.vue')
        },
        {
            path:'/doctors',
            name:'doctors',
            component: () => import('../views/doctors.vue')
        },
        {
            path:'/appointments',
            name:'appointments',
            component: () => import('../views/appointments.vue')
        },
        {
            path:'/admin',
            name:'admin',
            component: () => import('../views/adminPage.vue')
        },
        {
            path:'/Login',
            name:'Login',
            component: () => import('../views/Login.vue')
        },
    ]
})

export default router
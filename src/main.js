import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Users from './components/Users'
import About from './components/About'
import AddUser from './components/AddUser'
import ViewUser from './components/ViewUser'
import EditUser from './components/EditUser'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(vueResource)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: Users },
        { path: '/about', component: About },
        { path: '/add-user', component: AddUser },
        { path: '/view-user/:id', component: ViewUser },
        { path: '/edit-user/:id', component: EditUser },
    ]
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
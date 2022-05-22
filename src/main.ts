import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

router.beforeEach((to, from, next) => {
    if(router.resolve(to).name == '404'){
        next('/')
        return
    }
    if (to.matched.some(record => record?.meta?.auth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
        return
    }
    next()
    return
});

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HelperAuth from '@/helper/HelperAuth'

createApp(App).use(store).use(router).mount('#app')

router.beforeEach(async (to, from, next) => {
    if(router.resolve(to).name == '404'){
        next('/')
        return
    }
    if (to.matched.some(record => record?.meta?.auth)) {
        const canLogin = await HelperAuth.isAuthenticated()
        return canLogin? next(): next('/login')
    }
    next()
    return
});

import Auth from '@/model/auth/Auth'
import axios from 'axios';
import ResponseAuth from '@/model/auth/ResponseAuth';
import store from '@/store';
import router from '@/router';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth',
})
export default class HelperAuth {
    static async attemptLogin(auth: Auth): Promise<ResponseAuth>{
        const response: ResponseAuth = new ResponseAuth();
        await api.post('/login', auth).then(({ data }) => {
            response.setUser(data.user);
            localStorage.setItem('token', data.token);
            store.commit('login', data.user);
        }).catch( error => {
            console.log(error)
            if(error.response.status === 400){
                response.setErrors(error.response.data);
            }
        });
        return response
    }
    static async isAuthenticated(): Promise<boolean>{
        if(store.getters.isLoggedIn){return true}

        const token = localStorage.getItem('token');
        if(!token){return false}
        return (await HelperAuth.attemptLogin(new Auth({token}))).isSuccessful()
    }
    static async logout() {
        localStorage.removeItem('token');
        store.commit('logout');
        router.push('/login');
    }
}
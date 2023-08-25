import { defineStore } from "pinia";

export const useLoginStore = defineStore({
    id: 'login',
    state: () => {
        return {
            isLogged: false
        }
    },

    getters: {
        getLoginState: (state) => state.isLogged,
        getLocalStorageToken: () =>{
            return JSON.parse(localStorage.getItem('_gtk'))
        }
    },

    actions: {
        updateLoginState(payload){
            this.isLogged = payload;
        }
    }
})
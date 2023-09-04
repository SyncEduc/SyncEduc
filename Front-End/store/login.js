import { defineStore } from "pinia";

export const useLoginStore = defineStore({
    id: 'login',
    state: () => {
        return {
            isLogged: true
        }
    },

    getters: {
        getLoginState: (state) => state.isLogged,
    },

    actions: {
        updateLoginState(payload){
            this.isLogged = payload;
        },
        getLocalStorageToken: () =>{
            return localStorage.getItem('_gtk')
        },
        getLocalStorageTarget: ()=>{
            return localStorage.getItem("_gtt")
        }
    }
})
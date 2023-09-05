import { defineStore } from "pinia";

export const useLoginStore = defineStore({
    id: 'login',
    state: () => {
        return {
            isLogged: true,
            currentTarget: ''
        }
    },

    getters: {
        getLoginState: (state) => state.isLogged,
    },

    actions: {
        updateLoginState(payload){
            this.isLogged = payload;
        },
        setTarget(payload){
            
        },
        getLocalStorageToken: () =>{
            return localStorage.getItem('_gtk')
        },
        getLocalStorageTarget: ()=>{
            return localStorage.getItem("_gtt")
        }
    }
})
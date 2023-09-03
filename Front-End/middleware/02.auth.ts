import { useLoginStore } from "~/store/login";
const loginStore = useLoginStore()
export default defineNuxtRouteMiddleware(async (to, from) => {
    if(loginStore.getLoginState){
        return true
    }else{
        return navigateTo('/login')
    }
});

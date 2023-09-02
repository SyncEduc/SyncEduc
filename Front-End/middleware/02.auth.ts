import { useLoginStore } from "~/store/login";
const loginStore = useLoginStore()
export default defineNuxtRouteMiddleware(async (to, from) => {
    if(loginStore.getLoginState){
        console.log("auth")
        return true
    }else{
        return navigateTo('/login')
    }
});

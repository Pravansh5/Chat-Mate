import { create } from "zustand";

export const useAuthStore = create((set,get)=>({
    authUser:{name:"jshon",_id:123,age:23},
    isLoggedIn:false,
    isLoading:false,
    login:()=>{
        console.log("we just login !!");
        set({isloggedIn:true,isLoading:true});
    }
}))
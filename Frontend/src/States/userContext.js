import React,{useContext,createContext} from "react";

const UserContext = React.createContext({
    username:"",
    activeState:1,
    setUserName:()=>{},
    setActiveState:()=>{},

});

export const UserContextProvider = UserContext.Provider;

export default function useCounterContext(){
    return useContext(UserContext);
}
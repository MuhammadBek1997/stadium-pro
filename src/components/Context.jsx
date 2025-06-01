import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useTranslation } from "react-i18next";




export const AppContext = createContext();


export const AppProvider = ({children}) => {

    const { data, loading, error } = useFetch('https://45.138.158.239:5923/api/Stadium/GetAll');

    
    

    return(
        <AppContext.Provider value={{
            data
        }}>
            {children}
        </AppContext.Provider>
    )
}



export const UseGlobalContext = () =>{
    return useContext(AppContext);
}

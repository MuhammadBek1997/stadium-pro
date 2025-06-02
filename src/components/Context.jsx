import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";




export const AppContext = createContext();


export const AppProvider = ({children}) => {

    const { data, loading, error } = useFetch('http://45.138.158.239:5923/api/Stadium/GetAll');

    // const data = stadium
     


    const handleCreateOrder = async (customerId,stadiumId,startTime,endTime) =>{
        try {
            const response = await fetch('http://45.138.158.239:5923/api/Order/CreateOrder',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg3ODQ2ODAsImlzcyI6IkZ1ZGJhbGxNYW5hZ2VtZW50LnV6IiwiYXVkIjoiRm9vdGJhbGxNYW5hZ2VtZW50Q2xpZW50In0.01rqyllTk0EVnTymtGWT54-tTCHLFLrOiim1Hhne2ss"
                },
                body:JSON.stringify({
                    customerId:customerId,
                    stadiumId:stadiumId,
                    startTime:startTime,
                    endTime:endTime
                })
            })
            const data = await response.json();
            console.log('Natija:', data);
        } catch (err) {
            console.error('Xatolik:', err);
        }

        location.reload()
    }



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

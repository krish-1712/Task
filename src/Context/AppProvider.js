
import React, { createContext, useContext, useEffect, useState } from "react";


const AppContext= createContext()

const AppProvider = ({children}) => {
     const[user,setUser]=useState([]);
    useEffect(()=>{
        const getUserDetails=async()=>{
            try{

                const response= await fetch("https://www.melivecode.com/api/attractions",{
                    method:"GET"
                });
                const data = await response.json()
                console.log(data);
                setUser(data)
                if(!data){
                    console.log("unable to fetch the data") 
                }
            }catch(error){
                console.log(error)
            }
        }
        getUserDetails();
    },[])

  return (
    <AppContext.Provider
    value={{ user,setUser} }
    >
        {children}
    </AppContext.Provider>
  )
}

export const Appstate=()=>{
    return useContext(AppContext)
}

export default AppProvider
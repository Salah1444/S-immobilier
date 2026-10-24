"use client"
import { cache } from "react";
import Api from "@/lib/axios";
import { type Agence } from "@/types/agencyTypes";
import { useEffect, useState } from "react";

export  const  useGetAgency = ()=> {
  const [agency,setAgency] = useState<Agence>();
  const [isLoading,setIsLoading] = useState<boolean>(true);
  const [isError,setIsError] = useState<boolean>(false);
  async function getInfo() {
    try{
      setIsLoading(true);
      const {data} = await Api.get('/agency');
      setIsError(false);
      setAgency(data);
    }catch(err){
        console.error(err);
        setIsError(true);
    }finally{
        setIsLoading(false);
        
    }
  }
  useEffect(()=>{
    getInfo();
  },[])
  return {agency,isLoading,isError};
}
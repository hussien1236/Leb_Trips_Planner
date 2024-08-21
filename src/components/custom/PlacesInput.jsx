import React, { useEffect, useState } from 'react'
import ComboBox from './ComboBox'
import { useToast } from '../ui/use-toast';


const PlacesInput = ({onchangefn, loading}) => {
const [places,setPlaces] = useState([]);
const {toast}=useToast();
   //fetching api
   useEffect(() => {
    const fetchPlaces = async () => {
      try {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY",import.meta.env.VITE_PLACES_API_KEY);
        const response = await fetch("https://api.countrystatecity.in/v1/countries/LB/cities", {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        });
        const result = await response.json();
        setPlaces(result);
    } catch {
        toast({
          title: "Error fetching data",
          
        })
    }
  }
  fetchPlaces();
},[]);


  return (

     <ComboBox loading={loading} places={places} onchangefn={onchangefn} className="-w-full"/>
  )
}
export default PlacesInput
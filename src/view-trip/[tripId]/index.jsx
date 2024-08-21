import { useParams } from "react-router-dom"
import {doc, getDoc} from "firebase/firestore"
import { db } from "@/service/firebaseConfig";
import { toast } from "@/components/ui/use-toast";
import { useEffect,useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";

const View_trip = () => {
    const {tripId}=useParams();
    const [trip,setTrip]=useState();
    useEffect(()=>{
      getTripData();
    },[tripId]);
    const getTripData=async()=>{
      const docRef = doc(db,"AiTrips",tripId)
      const docSnap=await getDoc(docRef);
      if(docSnap.exists()){
        setTrip(docSnap.data());
      }
      else {
        toast({ title: "No trip found"});
      }
    }
  return (
    <div className="-p-10 md:-px-20 lg:-px-44 xl:-px-56">
    {/* Information Section */}
    <InfoSection trip={trip}></InfoSection>
    {/* Recommended Hotels */}
    <Hotels trip={trip}></Hotels>
    {/* Daily Plan */}
    <PlacesToVisit trip={trip}></PlacesToVisit>
    </div>
  )
}

export default View_trip
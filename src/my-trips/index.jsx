import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import UserTripCardItem from './components/UserTripCardItem';


const MyTrips = () => {
    useEffect(()=>{GetUserTrips()},[]);
    const [userTrips,setUserTrips]=useState([]);
    const GetUserTrips = async ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const q = query(collection(db,'AiTrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        const tripsArray = [];
        querySnapshot.forEach((doc) => {
        tripsArray.push(doc.data());
        });
        setUserTrips(tripsArray);
    }
  return (
    <div className='sm:-px-10 md:-px-32 lg:-px-56 xl:-px-72 -px-5 -mt-10 -mx-5'>
        <h2 className='-font-bold -text-3xl'><span className="-text-[#f56551] ">My</span> Trips</h2>
        <div className='-grid md:-grid-cols-3 sm:-grid-cols-2 -gap-3 -mt-7 '>
        {userTrips.length>0? userTrips.map((trip, index)=>(
                <UserTripCardItem key={index} trip={trip}/>
            )):[1,2,3,4,5,6].map(index=>(
                <div key={index} className='-h-[250px] -w-full -bg-slate-200 -rounded-xl -animate-pulse'>
                </div>
            
            ))
        }
        </div>
    </div>
        )
}

export default MyTrips
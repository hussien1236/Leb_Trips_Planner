import { useToast } from "@/components/ui/use-toast"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options'
import PlacesInput from '../components/custom/PlacesInput'
import {Input} from '../components/ui/input'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";  
import {useEffect, useState} from "react"
import {Button} from "../components/ui/button"
import { chatSession } from "@/service/AI_Model";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BsGoogle } from "react-icons/bs";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(useGSAP);
const Index = () => {
  const [openDialog,setOpenDialog]=useState(false);
  const { toast } = useToast();
  const [formData,setFormData]= useState('');
  const [spanVisibility,setSpanVisibility]=useState(true);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
 useGSAP(()=>{
    gsap.to(".title_anim",{
      opacity:1,
      scale:1,
      duration:1,
      ease:"elastic.out",
      y:0
    })},[])
  const handleInputChanges = (name, value)=>{
    if(!loading)
     setFormData({...formData,[name]: value});
  }
  useEffect(()=>{
  },[formData])
  const GenerateTrip =async()=>{
    const user = localStorage.getItem("user");
    if(!user){
      setOpenDialog(true);
      return;
    }
    if(formData?.nbOfDays < 1 || formData?.nbOfDays > 5 ){
      setSpanVisibility(false);
      return;
    }
    if(!formData?.nbOfDays || !formData.Budget || !formData.nbOfPeople || !formData.place){
      toast({
        title: "Please fill all the fields",
        
      })
      return;
    }
    setLoading(true);
   const Final_Prompt=AI_PROMPT
   .replace("{Location}",formData?.place)
   .replace("{nbOfDays}",formData?.nbOfDays)
   .replace("{nbOfDays}",formData?.nbOfDays)
   .replace("{nbOfPeople}",formData?.nbOfPeople)
   .replace('{Budget}',formData?.Budget);
   const result= await chatSession.sendMessage(Final_Prompt);
   setLoading(false);
   SaveTripData(result?.response?.text());
  
  }
  const login = useGoogleLogin({
    onSuccess:(cred)=>GetUserData(cred),
    onError:()=>toast({
      title: "an error occured while getting user credentials",
      
    })
  })
  const GetUserData=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
    {
    headers:{
      Authorization:`Bearer${tokenInfo?.access_token}`,
      Accept:'Application/json'
    }
   }).then((resp)=>{
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpenDialog(false);
    GenerateTrip();
   })
  }
  const SaveTripData=async (TripData)=>{
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection:formData,
      tripData: JSON.parse(TripData),
      userEmail:user.email,
      DateCreated:Date.now(),
      id:docId
    });
    navigate('/view-trip/'+docId);
    setLoading(false);
  }
  return (
    <div className=" sm:-px-10 -md:px-32 -lg:px-56
     -px-3 md:-mt-10 -mx-10 -flex -flex-col -gap-10">
      <div className='-text-center'>
      <h1 
      className="title_anim md:-text-4xl -font-extrabold lg:-text-6xl -text-center -mt-20
      -text-2xl"
      > Tell us 
        <span className="-text-[#f56551] "> your travel preferences </span> 
        🏝️
      </h1>
      <p className="-mt-3 -text-gray-500 lg:-text-xl md:-text-lg sm:-text-md -text-sm">Just provide some basic information, and our trip planner will 
        generate a customized itinerary based on your preferences
      </p>
      </div>
      <div >
        <h2 className="-text-xl -my-3 -font-semibold">What is destination of choice?</h2>
       <PlacesInput loading={loading} onchangefn={handleInputChanges} className="-w-full"/>
      </div>
      <div>
      <h2 className="-text-xl -my-3 -font-semibold">How many days are you planning your trip?</h2>
      <Input disabled={loading} onChange={(e)=>handleInputChanges("nbOfDays",e.target.value)} type="number" placeholder="number of days" className="-w-full"/>
      <span className={`${spanVisibility?'-hidden':'-block'} -text-red-500 -text-sm -font-semibold`}>number of days must be between 1 and 4</span>
      </div>
      <div>
      <h2 className="-text-xl -my-3 -font-semibold">what is Your Budget?</h2>
      <div className='-grid md:-grid-cols-3 -grid-cols-2 -gap-5 -mt-5'>
        {SelectBudgetOptions.map((item,index)=>(
          <div key={index} onClick={()=>handleInputChanges("Budget",item.title)} className={`${item.title===formData?.Budget && '-shadow-lg -border-[#f56551] -border-2'} -flex -items-center -flex-col -p-4 -border -rounded-xl hover:-shadow-lg -cursor-pointer`}>
            <h2>{item.icon}</h2>
            <h2 className='-font-bold md:-text-2xl -text-md'>{item.title}</h2>
            <h2 className='-text-xs md:-text-md -font-semibold -text-slate-500 -text-center'>{item.desc}</h2>
          </div>
        ))}
      </div>
      </div>
      <div>
      <h2 className="-text-xl -my-3 -font-semibold">Who do you plan on traveling with on your next adventure?</h2>
      <div className='-grid md:-grid-cols-3 -grid-cols-2 -gap-5  -mt-5'>
        {SelectTravelesList.map((item,index)=>(
          <div key={index} onClick={()=>handleInputChanges("nbOfPeople",item.title)} className={`-flex -items-center -flex-col -p-4 -rounded-xl ${item.title===formData?.nbOfPeople && '-shadow-lg -border-[#f56551] -border-2'} hover:-shadow-lg -cursor-pointer`}>
            <h2>{item.icon}</h2>
            <h2 className='-font-bold md:-text-2xl -text-md'>{item.title}</h2>
            <h2 className='-text-xs md:-text-md -font-semibold -text-slate-500 -text-center'>{item.desc}</h2>
          </div>
        ))}
      </div>
      </div>
      <div className='-flex -justify-center -m-3'>
      <Button
      disabled={loading} 
      onClick={GenerateTrip}>
        {loading?<AiOutlineLoading3Quarters className="-animate-spin "/>:'Generate Trip'}
      </Button>
    </div>
    <Dialog open={openDialog}>
  <DialogContent  className="-bg-white">
    <DialogHeader>
      <DialogTitle><img src="/src/assets/Logo.png" alt="logo" width={150}/></DialogTitle>
      <DialogDescription className="-flex -flex-col -items-center -gap-3">      
        <h2 className="-text-xl">Sign In With Google</h2>
        <p className="-text-slate-500">Sign in to the App with Google authentication securely</p>
        <Button className="-w-full -flex -gap-2"
        onClick={login}>
        <BsGoogle />
        Sign In With Google
        </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
     
  )
}

export default Index
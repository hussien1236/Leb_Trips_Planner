import { IoIosLogOut } from "react-icons/io";
import { GrSchedulePlay } from "react-icons/gr";
import { useState } from 'react';
import { Button } from '../ui/button'
import '/src/index.css'
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
import { IoMdAdd } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from "@react-oauth/google";
import { Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useToast } from "../ui/use-toast";

const Header = () => {
  const {toast}= useToast();
  const [openDialog,setOpenDialog]=useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const login = useGoogleLogin({
    onSuccess:(cred)=>GetUserData(cred),
    onError:()=>   toast({
      title: "Error occured while getting you credentials",   
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
   })
  } 
  return (
    <header className='-px-10 -py-5 -shadow-sm '>
        <nav className='-flex -justify-between -items-center '>
                <img src="/assets/logo.png" alt="logo" width={200}/>
                <div >
               {user?<div className='-flex -gap-5 -items-center'>
                <Popover>
                  <PopoverTrigger><img src={user?.picture} className='-h-[50px] -w-[50px] -rounded-full'/>
                  </PopoverTrigger>
                  <PopoverContent className="-bg-white -rounded-xl -flex -flex-col -gap-1">
                  <a href="/">
                  <div className="-font-bold hover:-bg-gray-100 -cursor-pointer -rounded-xl -p-2 -flex -items-center -gap-3 -px-7">
                  <FaHome />
                  <h2>Home</h2>
                  </div>
                  </a> 
                  <a href="/create-trip">
                  <div className="-font-bold hover:-bg-gray-100 -cursor-pointer -rounded-xl -p-2 -flex -items-center -gap-3 -px-7">
                  <IoMdAdd/>
                  <h2>Create trip</h2>
                  </div>
                  </a>
                  <a href="/my-trips">
                  <div className="-font-bold hover:-bg-gray-100 -cursor-pointer -rounded-xl -p-2 -flex -items-center -gap-3 -px-7">
                  <GrSchedulePlay />
                  <h2>My Trips</h2>
                  </div>
                  </a>
                  <a href="/">
                  <div className="-font-bold -text-red-400 hover:-bg-gray-100 -cursor-pointer -p-2 -rounded-xl -flex -items-center -gap-3 -px-7">
                  <IoIosLogOut />
                  <h2 onClick={()=>{
                    googleLogout();
                    localStorage.removeItem('user');
                  }}>Logout</h2>
                  </div>
                  </a>
                  </PopoverContent>
                  
                </Popover>

               </div> :
               <div>
               <Button onClick={()=>setOpenDialog(true)}>sign in</Button>
               <Dialog open={openDialog} setOpenDialog={setOpenDialog}>
               <DialogContent  className="-bg-white">
                 <DialogHeader>
                   <DialogTitle><img src="/assets/logo.png" alt="logo" width={150}/></DialogTitle>
                   <DialogDescription className="-flex -flex-col -items-center -gap-3">      
                     <h2 className="-text-xl -font-bold">Sign In With Google</h2>
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
             </div>}
                </div>
        </nav>
    </header>
  )
}

export default Header
import { Button } from "../ui/button"
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
const Hero = () => {

  useGSAP(()=>{
     gsap.to(".title_anim",{
       opacity:1,
       scale:1,
       duration:1,
       ease:"bounce.out",
       y:0
     })},[])
 
 return (
    <div
    className=" -flex -items-center -justify-center -mx-10 sm:-mx-20 lg:-mx-40 -gap-9
    -flex-col">
       <h1 
      className="title_anim md:-text-4xl -font-extrabold lg:-text-6xl -text-center -mt-20
      -text-2xl"
      >
        <span className="-text-[#f56551] ">Discover Your Next Adventure with AI: </span> 
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="-text-gray-500 sm:-text-sm -text-xs -text-center">Your personal trip planner and travel curator, creating custom
        itineraries tailored to you interests and budget.
      </p>
      <Link to="/create-trip">
        <Button>Get Started, It's Free</Button>
      </Link>
      <div className="-mt-10 -w-full -flex -justify-center ">
         <img src="/public/assets/laptop.png"  className="-w-full -absolute " />
         <img src="/public/assets/internalPhoto.png"  className="-w-full sm:-px-14 -px-8 lg:-pt-32 md:-pt-24 sm:-pt-16 -pt-10" />

      </div>
      
    </div>
  )
}

export default Hero
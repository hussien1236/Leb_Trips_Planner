import { GrMoney } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { PiMoneyWavyThin } from "react-icons/pi";
import { FaPersonHiking } from "react-icons/fa6";
import { FaChampagneGlasses } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";

export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:<FaPersonHiking size={30}/>,
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:<FaChampagneGlasses size={30}/>,
        people:'2 people'
    },
    {
        id:3,
        title:'family',
        desc:'A group of fun loving adventure',
        icon:<MdOutlineFamilyRestroom size={30}/>,
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:<GiThreeFriends size={30}/>,
        people:'5 to 10 people'
    },
]
 export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:<GrMoney size={30}/>
    },
    {
        id:2,
        title:'Moderate',
        desc:'keep cost on the average side',
        icon:<PiMoneyWavyThin size={30}/>
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:<GiTakeMyMoney size={30}/>
    }
 ]   
export const AI_PROMPT="Generate Travel Plan for Location:{Location}, for {nbOfDays} Days for {nbOfPeople} with a {Budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {nbOfDays} days with each day plan with best time to visit in JSON format\n";

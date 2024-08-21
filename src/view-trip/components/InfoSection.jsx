import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'

import { IoIosSend } from "react-icons/io";

const InfoSection = ({trip}) => {
  return (
    <div>
        <img src='/src/assets/Lebanon.jpg'
        className='sm:-h-[300px] -h-[200px] -w-full -rounded-3xl'></img>
        <div className='-my-5 -flex -flex-col -gap-2'>
            <h2 className='-font-bold -text-2xl'>{trip?.userSelection?.place}</h2>
            <div className='-flex -gap-3 -justify-between sm:-flex-row -flex-col'>
                <div className='-flex -gap-3 -flex-wrap'>
                <h2 className='sm:-p-2 -p-1 sm:-px-3 -px-2 -bg-gray-200 -rounded-full -text-gray-500 -whitespace-nowrap'>🗓️ {trip?.userSelection?.nbOfDays} Days</h2>
                <h2 className='sm:-p-2 -p-1 sm:-px-3 -px-2 -bg-gray-200 -rounded-full -text-gray-500 -whitespace-nowrap'>💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className='sm:-p-2 -p-1 sm:-px-3 -px-2 -bg-gray-200 -rounded-full -text-gray-500 -whitespace-nowrap'>No. Of Traveler: {trip?.userSelection?.nbOfPeople} </h2>
                </div>
                <div><Button className="-w-20 "><IoIosSend size={20}/></Button></div>
            </div>
            
        </div>
    </div>  
  )
}

export default InfoSection
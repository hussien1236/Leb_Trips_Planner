import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  return (
    <div >
        <h2 className='-font-bold -text-lg -my-3'>Places to Visit</h2>
        <div>
            {trip?.tripData?.itinerary.map((dayActivities,index)=>(
                <div key={index} className='-shadow-sm -rounded-xl p-5 -mt-5'>
                    <h2 className='-font-medium -text-lg -mb-2'>{dayActivities.day}</h2>
                   <div className='-grid sm:-grid-cols-2 -gap-3'>
                    {dayActivities.plan.map((place,index)=>(
                        <div key={index} className='lg:-h-45'>
                            <PlaceCardItem place={place}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit
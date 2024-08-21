import React from 'react'
import { Link } from 'react-router-dom'
const PlaceCardItem = ({place}) => {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName},${place?.geoCoordinates.split(',').map(coord=>coord.trim())[0]},${place?.geoCoordinates.split(',').map(coord=>coord.trim())[1]}`}>
    <div className='-border -p-3 -rounded-xl -flex -gap-5 hover:-shadow-lg hover:-scale-105 -cursor-pointer -transition-all lg:-flex-row -flex-col -h-full'>
        <img src="/public/assets/events_photo.jpg" alt="placeImg"
        className='lg:-w-[130px] md:-h-100vh -rounded-xl -w-full' />
        <div>
            <h2 className='-font-bold xl:-text-xl lg:-text-md sm:-text-lg'>{place?.placeName}</h2>
            <p className='xl:-text-sm -text-xs -text-gray-400 '>{place.placeDetails}</p>
            <h2 className='mt-2'>🕐 {place.timeToTravel}</h2>  
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
import {Link} from 'react-router-dom'
const Hotels = ({trip}) => {
  return (
    <div >
        <h2 className='-text-start -font-bold -text-xl -mt-5 -mb-3'>Hotel Recommendations</h2>
        <div className='-gap-3 -grid xl:-grid-cols-4 lg:-grid-cols-3 sm:-grid-cols-2 -grid-cols-1'>
            {trip?.tripData?.hotelOptions?.map((hotel,index)=>(
            <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress},${hotel.geoCoordinates.split(',').map(coord=>coord.trim())[0]},${hotel.geoCoordinates.split(',').map(coord=>coord.trim())[1]}`} key={index}>
              <div className='hover:-scale-105 -cursor-pointer -shadow-md -transition-all -rounded-xl lg:-h-80'>
                <img src='/src/assets/hotels_photo.jpg' alt="placeholder" className=' -rounded-t-xl'/>
                <div className='-p-4 -flex -flex-col'>
                <h2 className='-font-medium '>{hotel.hotelName}</h2>
                <h2 className='-text-sm -text-gray-500 -align-baseline'>📍 {hotel.hotelAddress}</h2>
                <h2 className='-text-sm '>💸 {hotel.price}</h2>
                <h2 className='-text-sm -align-baseline'>⭐ {hotel.rating}</h2>
              </div>
              </div>
              </Link>
            )
            )}
            
        </div>
    </div>
  )
}

export default Hotels
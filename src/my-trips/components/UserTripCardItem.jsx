import { Link } from 'react-router-dom';
const UserTripCardItem = ({trip}) => {
    const readableDate = new Date(trip?.DateCreated);
    const formattedDate = readableDate.toDateString();
  return (
    <Link to={`/view-trip/`+trip.id}>
   <div className="-shadow-lg -rounded-b-2xl -mb-3 hover:-scale-105 -cursor-pointer -transition-all">
        <img src='/assets/Lebanon.jpg' className="-rounded-t-2xl -object-cover"/>
        <div className="-pb-5 -pt-3 -pl-3">
            <h2 className="-font-bold -text-lg">{trip?.userSelection?.place}</h2>
            <h2 className="-text-sm -text-gray-400">{trip?.userSelection?.nbOfDays} days trip with {trip?.userSelection?.Budget} Budget</h2>
            <h2 className="-text-sm -text-gray-500">Created at: {formattedDate}</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
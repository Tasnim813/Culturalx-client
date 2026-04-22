import React from 'react';
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { Link } from 'react-router';

const Card = ({ event }) => {
     const { _id } = event

  const { name, image, date, startTime, endTime, location, price, category } = event || {};

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <img
          src={image || 'https://via.placeholder.com/400x200'}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{name}</h2>
          <span className="text-lg font-bold text-green-600">${price}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaRegClock className="mr-2 text-green-500" />
          <span>{date} | {startTime} - {endTime}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FaLocationDot className="mr-2 text-green-500" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Action Button */}
     
        <Link 
          to={`/event-details/${_id}`} 
          className="block w-full text-center bg-gray-900 text-white py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
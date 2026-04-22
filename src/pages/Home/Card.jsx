import React from 'react';
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { Link } from 'react-router';

const Card = ({ event }) => {
  const { _id } = event;
  const { name, image, date, startTime, endTime, location, price, category } = event || {};

  return (
    <div className="max-w-sm bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">

      {/* Image */}
      <div className="relative h-48 w-full">
        <img
          src={image || 'https://via.placeholder.com/400x200'}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-[#0F3D2E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title + Price */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {name}
          </h2>

          <span className="text-lg font-bold text-[#0F3D2E]">
            ${price}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FaRegClock className="mr-2 text-[#0F3D2E]" />
          <span>{date} | {startTime} - {endTime}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FaLocationDot className="mr-2 text-[#0F3D2E]" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Button */}
        <Link
          to={`/event-details/${_id}`}
          className="block w-full text-center bg-[#0F3D2E] text-white py-2.5 rounded-xl font-semibold hover:bg-[#145A32] transition-colors duration-200"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default Card;
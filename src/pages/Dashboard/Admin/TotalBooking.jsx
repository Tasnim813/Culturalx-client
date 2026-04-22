import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const TotalBooking = () => {

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`)
      return res.data
    }
  })

  if (isLoading) return <p className="p-5 text-[#0F3D2E]">Loading...</p>
  if (error) return <p className="p-5 text-red-500">Failed to load bookings</p>

  return (
    <div className="p-5 bg-[#F6FDF9] min-h-screen">

      <h2 className="text-2xl font-bold mb-5 text-[#0F3D2E] text-center">
        Total Bookings: {bookings.length}
      </h2>

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border border-[#d1e7dd] p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="font-bold text-[#145A32] text-lg">
              {b.eventName}
            </h2>

            <p className="text-gray-700">👤 User: {b.userEmail}</p>
            <p className="text-gray-700">🔢 Quantity: {b.quantity}</p>
            <p className="text-[#145A32] font-semibold">💰 Price: ${b.price}</p>
            <p className="text-gray-700">📍 Location: {b.location}</p>

            <p className="mt-2">
              📅 Status: 
              <span className="ml-1 px-2 py-1 rounded-full text-xs bg-[#e6f4ea] text-[#0F3D2E]">
                {b.bookingStatus}
              </span>
            </p>

            <p className="text-gray-500 text-sm mt-1">
              🕒 Time: {b.bookingTime}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TotalBooking
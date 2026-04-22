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

  if (isLoading) return <p className="p-5">Loading...</p>
  if (error) return <p className="p-5 text-red-500">Failed to load bookings</p>

  return (
    <div className="p-5">

      <h2 className="text-2xl font-bold mb-5">
        Total Bookings: {bookings.length}
      </h2>

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded-xl shadow bg-white"
          >
            <h2 className="font-bold text-green-600">
              {b.eventName}
            </h2>

            <p>👤 User: {b.userEmail}</p>
            <p>🔢 Quantity: {b.quantity}</p>
            <p>💰 Price: ${b.price}</p>
            <p>📍 Location: {b.location}</p>
            <p>📅 Status: {b.bookingStatus}</p>
            <p>🕒 Time: {b.bookingTime}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TotalBooking
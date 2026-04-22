import React, { useEffect, useRef } from 'react'
import { IoBagCheckOutline } from 'react-icons/io5'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router'

const Payment = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const hasPosted = useRef(false)

  useEffect(() => {
    const updatePayment = async () => {
      if (sessionId && !hasPosted.current) {
        hasPosted.current = true

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/payment-success`,
            { sessionId }
          )

          console.log('Payment Success:', res.data)
        } catch (error) {
          console.error('Payment error:', error)
        }
      }
    }

    updatePayment()
  }, [sessionId])

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F6FDF9]">
      <div className="bg-white border border-[#d1e7dd] p-10 rounded-2xl shadow-xl text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#e6f4ea] p-4 rounded-full">
            <IoBagCheckOutline className="w-14 h-14 text-[#145A32]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#0F3D2E] mb-2">
          Event Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your event booking is confirmed. Enjoy your event experience!
        </p>

        {/* Button */}
        <Link
          to="/dashboard/my-orders"
          className="inline-block bg-[#0F3D2E] text-white font-semibold py-2 px-6 rounded-full 
                     hover:bg-[#145A32] transition duration-300 shadow-md"
        >
          Go to My Bookings
        </Link>

        {/* Accent line */}
        <div className="mt-6 h-1 w-20 mx-auto bg-[#145A32] rounded-full"></div>

      </div>
    </div>
  )
}

export default Payment
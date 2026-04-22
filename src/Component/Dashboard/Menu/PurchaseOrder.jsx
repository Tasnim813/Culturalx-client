import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'

import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../../hook/useAuth'
import axios from 'axios'

const PurchaseOrder = ({ closeModal, isOpen, event }) => {

  const { user } = useAuth()
  const { register, handleSubmit, watch } = useForm()

  // Quantity track kora total price calculate korar jonno
  const quantity = watch('ticketQuantity') || 1
  const totalPrice = quantity * (event?.price || 0)
const { mutateAsync } = useMutation({
  mutationFn: async (bookingData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/bookings`,
      bookingData
    )
    return res.data
  }
})

  const onSubmit = async () => {
  if (!user?.email) {
    return Swal.fire('Error', 'Please login first', 'error')
  }

  Swal.fire({
    title: `Confirm Booking?`,
    text: `Total price for ${quantity} ticket(s) is $${totalPrice}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#ef4444',
    confirmButtonText: 'Yes, Book Now!',
  }).then(async (result) => {
    if (result.isConfirmed) {

     const bookingData = {
  eventId: event?._id,
  eventName: event?.name,
  price: Number(totalPrice),
  quantity: Number(quantity),
  location: event?.location,
  date: event?.date,
  userEmail: user?.email,
  userName: user?.displayName,
  phoneNumber: watch('phoneNumber') || "",
  bookingStatus: 'confirmed',
  paymentStatus: 'pending',   // ✅ এটা add করো
  bookingTime: new Date().toISOString(),
  organizerEmail: event?.seller?.email || "unknown",
}

      try {
        await mutateAsync(bookingData)
        Swal.fire('Booked!', 'Your tickets have been booked successfully.', 'success')
        closeModal()
      } catch (err) {
        console.error(err)
        Swal.fire('Error', 'Booking failed', 'error')
      }
    }
  })
}

  return (
    <Dialog open={isOpen} as='div' className='relative z-50 focus:outline-none' onClose={closeModal}>
      {/* Backdrop blur effect */}
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40 backdrop-blur-sm'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all border border-green-100'>

            <DialogTitle as='h3' className='text-2xl font-bold text-center text-green-600 mb-4'>
              Event Ticket Booking
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              
              {/* Event Summary */}
              <div className='bg-green-50 p-4 rounded-xl space-y-1'>
                <p className='text-sm text-gray-700 font-medium'>
                  <span className='text-green-700'>Event:</span> {event?.name}
                </p>
                <p className='text-sm text-gray-700'>
                  <span className='text-green-700'>Location:</span> {event?.location}
                </p>
                <p className='text-sm text-gray-700'>
                  <span className='text-green-700'>Price:</span> ${event?.price} / ticket
                </p>
              </div>

              {/* Form Inputs */}
              <div className='grid grid-cols-1 gap-4'>
                <div>
                  <label className='text-sm font-semibold text-gray-600'>Ticket Quantity</label>
                  <input
                    type='number'
                    min='1'
                    defaultValue={1}
                    {...register("ticketQuantity", { required: true })}
                    className='w-full mt-1 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition'
                  />
                </div>

                <div>
                  <label className='text-sm font-semibold text-gray-600'>Phone Number</label>
                  <input
                    type='tel'
                    placeholder='Enter your phone number'
                    {...register("phoneNumber", { required: true })}
                    className='w-full mt-1 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition'
                  />
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className='flex justify-between items-center py-2 px-1'>
                <span className='text-gray-500'>Total Amount:</span>
                <span className='text-xl font-bold text-green-600'>${totalPrice}</span>
              </div>

              {/* Buttons */}
              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  className='flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-lg active:scale-95'
                >
                  Confirm Booking
                </button>

                <button
                  type='button'
                  onClick={closeModal}
                  className='px-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold hover:bg-red-50 hover:text-red-500 transition'
                >
                  Cancel
                </button>
              </div>

            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseOrder
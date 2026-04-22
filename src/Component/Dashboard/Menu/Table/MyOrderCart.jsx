import axios from "axios"
import { motion } from "framer-motion"
import useAuth from "../../../../hook/useAuth"

const MyOrderCart = ({ order }) => {
  const { user } = useAuth()

  const {
    _id,
    eventName,
    bookingStatus,
    price,
    quantity,
    location,
    paymentStatus,
  } = order || {}

  const handlePayment = async () => {
    if (!user?.email) {
      return alert("Please login first")
    }

    const paymentInfo = {
      orderId: _id,
      eventName,
      price: Number(price),
      quantity: Number(quantity),
      customer: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      )

      window.location.href = data.url
    } catch (err) {
      console.log(err)
      alert("Payment failed")
    }
  }

  return (
    <motion.div
      className="border border-[#d1e7dd] p-5 rounded-xl shadow-sm bg-white hover:shadow-md transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold text-[#145A32]">{eventName}</h2>

      <p className="text-gray-700">Quantity: {quantity}</p>
      <p className="text-[#0F3D2E] font-semibold">Price: ${price}</p>
      <p className="text-gray-700">Location: {location}</p>

      <p className="mt-1">
        Status:{" "}
        <span className="px-2 py-1 text-xs rounded-full bg-[#e6f4ea] text-[#0F3D2E]">
          {bookingStatus}
        </span>
      </p>

      <p className="mt-2">
        Payment:{" "}
        {paymentStatus === "paid" ? (
          <span className="text-[#145A32] font-bold">Paid ✅</span>
        ) : (
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-[#0F3D2E] hover:bg-[#145A32] text-white rounded-lg mt-2 transition"
          >
            Pay Now
          </button>
        )}
      </p>
    </motion.div>
  )
}

export default MyOrderCart
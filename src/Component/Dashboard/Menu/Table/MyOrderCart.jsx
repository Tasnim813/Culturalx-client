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
      quantity,
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
      className="border p-5 rounded-xl shadow bg-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold text-green-600">{eventName}</h2>

      <p>Quantity: {quantity}</p>
      <p>Price: ${price}</p>
      <p>Location: {location}</p>

      <p>Status: {bookingStatus}</p>

      <p className="mt-2">
        Payment:{" "}
        {paymentStatus === "paid" ? (
          <span className="text-green-600 font-bold">Paid ✅</span>
        ) : (
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
          >
            Pay Now
          </button>
        )}
      </p>
    </motion.div>
  )
}

export default MyOrderCart
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import MyOrderCart from '../../../Component/Dashboard/Menu/Table/MyOrderCart'
import useAuth from '../../../hook/useAuth'
import Loading from '../../Loading/loading'

const MyOrder = () => {
  const { user } = useAuth()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/${user.email}`
      )
      return res.data
    },
    enabled: !!user?.email,
  })

  if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
      {orders.length > 0 ? (
        orders.map(order => (
          <MyOrderCart key={order._id} order={order} />
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  )
}

export default MyOrder
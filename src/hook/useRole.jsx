
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'
import useAuth from './useAuth'


const useRole = () => {
  const { user, loading } = useAuth()


  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email, // ✅ FIXED
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
      )
      return data.role
    }
  })

  return [role, isRoleLoading]
}

export default useRole

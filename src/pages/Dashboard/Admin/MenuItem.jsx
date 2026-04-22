/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform rounded-md
        hover:bg-[#E8F5E9] hover:text-[#0F3D2E]
        ${isActive ? 'bg-[#E8F5E9] text-[#0F3D2E]' : 'text-gray-600'}`
      }
    >
      <Icon className='w-5 h-5 text-[#0F3D2E]' />

      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem
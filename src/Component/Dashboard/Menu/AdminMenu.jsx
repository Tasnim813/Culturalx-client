import { FaUserCog } from 'react-icons/fa'


import { ImCart } from "react-icons/im";
import MenuItem from '../../../pages/Dashboard/Admin/MenuItem';
const AdminMenu = () => {
  return (
    <>
    
      <MenuItem icon={FaUserCog} label='Add Event' address='Add-event' />
      <MenuItem icon={FaUserCog} label='Total Booking' address='Total-booking' />

      <MenuItem icon={ImCart} label='Manage User' address='manage-user' />
    </>
  )
}

export default AdminMenu

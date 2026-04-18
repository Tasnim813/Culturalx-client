import { FaUserCog } from 'react-icons/fa'

import { BsGraphUp } from 'react-icons/bs'
import { ImCart } from "react-icons/im";
import MenuItem from '../../../pages/Dashboard/Admin/MenuItem';
const AdminMenu = () => {
  return (
    <>
    <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='static-page'
              />
      <MenuItem icon={FaUserCog} label='Add Book' address='Add-book' />
      <MenuItem icon={ImCart} label='Manage Request' address='manage-request' />
    </>
  )
}

export default AdminMenu

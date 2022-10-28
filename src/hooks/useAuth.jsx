import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { selectCurrentToken } from '@/pages/auth/AuthSlice'

export const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = 'Manager'
  let isAdmin = 'Admin'
  let status = 'Doctor (a)'

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    isManager = roles.includes('Manager')
    isAdmin = roles.includes('Admin')

    if (isManager) status = 'Manager'
    if (isAdmin) status = 'Admin'

    return { username, roles, status, isManager, isAdmin }
  }

  return { username: '', roles: [], isManager, isAdmin, status }
}

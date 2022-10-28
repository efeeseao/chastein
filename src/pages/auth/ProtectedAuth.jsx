import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const ProtectedAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )

  return content
}
export default ProtectedAuth

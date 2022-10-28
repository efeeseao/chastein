import { Outlet } from 'react-router-dom'

import DashFooter from './Footer'
import DashHeader from './Header'
import { useTitle } from '@/hooks/useTitle'

const Dashboard = () => {
  useTitle('Dashboard')
  return (
    <>
      <DashHeader />
      <section>
        <Outlet />
      </section>
      <DashFooter />
    </>
  )
}
export default Dashboard

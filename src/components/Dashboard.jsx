import { Outlet } from 'react-router-dom'

import DashFooter from '../DashFooter'
import DashHeader from '../DashHeader'
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

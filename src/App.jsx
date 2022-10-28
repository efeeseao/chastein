import { Route, Routes } from 'react-router-dom'

import { Dashboard } from '@/components'
// import { ROLES } from '@/config/roles'
import { useTitle } from '@/hooks/useTitle'
import {
  EditNote,
  EditUser,
  Login,
  NewNote,
  NewUserForm,
  NotFound,
  NotesList,
  PersistLogin,
  Prefetch,
  // ProtectedAuth,
  UsersList,
  Welcome
} from '@/pages'

import './styles/global.scss'

function App() {
  useTitle('Ínicio | Clínica Chastein')

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<Prefetch />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new" element={<NewNote />} />
            </Route>
          </Route>
          {/* End Dash */}
        </Route>
      </Route>
      {/* End Protected Routes */}
    </Routes>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { store } from '@/app/store'
import { notesApiSlice } from '@/pages/NotesList/notesApiSlice'
import { usersApiSlice } from '@/pages/UsersList/usersApiSlice'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
    )
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    )
  }, [])

  return <Outlet />
}
export default Prefetch

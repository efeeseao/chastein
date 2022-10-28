import { useParams } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'
import { useGetNotesQuery } from './NotesApiSlice'
import { useGetUsersQuery } from '../users/UsersApiSlice'
import { EditNoteForm } from './EditNoteForm'
import { Loading } from '@/components'

const EditNote = () => {
  const { id } = useParams()

  const { isAdmin, isManager, username } = useAuth()

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id]
    })
  })

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id])
    })
  })

  if (!note || !users?.length)
    return (
      <div className="isLoading">
        <Loading />
      </div>
    )

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">Sem sucesso</p>
    }
  }

  return <EditNoteForm note={note} users={users} />
}

export default EditNote

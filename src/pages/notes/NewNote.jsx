import { Loading } from '@/components'
import { useGetUsersQuery } from '../users/UsersApiSlice'
import { NewNoteForm } from './NewNoteForm'

const NewNote = () => {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id])
    })
  })

  if (!users?.length)
    return (
      <div className="isLoading">
        <Loading />
      </div>
    )

  return <NewNoteForm users={users} />
}

export default NewNote

import { useParams } from 'react-router-dom'

import { useGetUsersQuery } from './UsersApiSlice'
import { EditUserForm } from './EditUserForm'
import { Loading } from '@/components'

const EditUser = () => {
  const { id } = useParams()

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  })

  return user ? (
    <EditUserForm user={user} />
  ) : (
    <div className="isLoading">
      <Loading />
    </div>
  )
}

export default EditUser

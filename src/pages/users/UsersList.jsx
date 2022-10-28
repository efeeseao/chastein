import { useGetUsersQuery } from './UsersApiSlice'
import User from './User'
import { Loading } from '@/components'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading)
    content = (
      <div className="isLoading">
        <Loading />
      </div>
    )

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />)
    content = (
      <table className="table table--users">
        <thead className="thead">
          <tr>
            <th className="th-user username" scope="col">
              Nome do Usuário
            </th>
            <th className="the-user roles" scope="col">
              Roles
            </th>
            <th className="th-user edit" scope="col">
              Editar
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    )
  }

  return content
}

export default UsersList

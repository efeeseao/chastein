import { useGetNotesQuery } from './NotesApiSlice'
import { Loading } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import Note from './Note'

const NotesList = () => {
  const { isAdmin, isManager, username } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
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
    const { ids, entities } = notes

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      )
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

    content = (
      <table className="table table--notes">
        <thead className="thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Estado
            </th>
            <th scope="col" className="table__th note__created">
              Criado aos
            </th>
            <th scope="col" className="table__th note__updated">
              Atualizado aos
            </th>
            <th scope="col" className="table__th note__title">
              Titulo
            </th>
            <th scope="col" className="table__th note__username">
              Proprietário(a)
            </th>
            <th scope="col" className="table__th note__edit">
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
export default NotesList

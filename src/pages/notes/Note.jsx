import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { useGetNotesQuery } from './NotesApiSlice'
import { useTitle } from '@/hooks/useTitle'

const Note = ({ noteId }) => {
  useTitle('Ver nota')
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId]
    })
  })

  const navigate = useNavigate()

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('pt-AO', {
      day: 'numeric',
      month: 'long'
    })

    const updated = new Date(note.updatedAt).toLocaleString('pt-AO', {
      day: 'numeric',
      month: 'long'
    })

    const handleEdit = () => navigate(`/dashboard/notes/${noteId}`)

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Feito</span>
          ) : (
            <span className="note__status--open">Aberto</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote

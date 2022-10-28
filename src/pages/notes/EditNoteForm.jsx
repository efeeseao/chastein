import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { useUpdateNoteMutation, useDeleteNoteMutation } from './NotesApiSlice'
import { useAuth } from '@/hooks/useAuth'

export const EditNoteForm = ({ note, users }) => {
  const { isAdmin, isManager } = useAuth()
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror }
  ] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dashboard/notes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)
  const onCompletedChanged = () => setCompleted((prev) => !prev)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async () => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed })
    }
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
  const updated = new Date(note.updatedAt).toLocaleString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validTitleClass = !title ? 'form-incomplete' : ''
  const validTextClass = !text ? 'form-incomplete' : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  let deleteButton = null

  if (isAdmin || isManager) {
    deleteButton = (
      <button
        type="button"
        className="icon-button"
        title="delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    )
  }

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <section className="notes-form">
        <h2>Editar Nota #{note.ticket}</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label className="form-label" htmlFor="note-title">
            Titulo
          </label>
          <input
            className={`form-input ${validTitleClass}`}
            id="note-title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
          />

          <label className="form-label" htmlFor="note-text">
            Texto
          </label>
          <textarea
            className={`form-input textarea ${validTextClass}`}
            id="note-text"
            name="text"
            value={text}
            maxLength="25"
            onChange={onTextChanged}
          />
          <div className="form-action">
            <label className="form-label form-checkbox" htmlFor="note-username">
              Atribuído a (ao):
            </label>
            <select
              id="note-username"
              name="username"
              className="form-select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form-title-row">
            <label
              className="form-label form-checkbox"
              htmlFor="note-completed"
            >
              Trabalho finalizado?:
              <input
                className="form-checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>
            <div className="form-divider">
              <p className="form-created">
                Criado aos
                <br />
                {created}
              </p>
              <p className="form-updated">
                Atualizado aos
                <br />
                {updated}
              </p>
            </div>
            <div className="form__action-buttons">
              <button
                className="icon-button"
                title="Save"
                onClick={onSaveNoteClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              {deleteButton}
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

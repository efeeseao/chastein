import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useAddNewNoteMutation } from './NotesApiSlice'
import { useTitle } from '@/hooks/useTitle'

export const NewNoteForm = ({ users }) => {
  useTitle('Criar nota')
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dashboard/notes')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validTitleClass = !title ? 'form-incomplete' : ''
  const validTextClass = !text ? 'form-incomplete' : ''

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <section className="notes-form">
        <h2>Criar uma nova Nota</h2>
        <form className="form" onSubmit={onSaveNoteClicked}>
          <label className="form-label" htmlFor="title">
            Titulo
          </label>
          <input
            className={`form-input ${validTitleClass}`}
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            placeholder="Titulo da note"
            value={title}
            onChange={onTitleChanged}
          />

          <label className="form-label" htmlFor="text">
            Texto
          </label>
          <textarea
            className={`form-input textarea ${validTextClass}`}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
          />

          <div className="form-action">
            <label className="form-label form-checkbox" htmlFor="username">
              Atribuído a(ao):
            </label>
            <select
              id="username"
              name="username"
              className="form-select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <button className="save-button" title="Save" disabled={!canSave}>
            Salvar
          </button>
        </form>
      </section>
    </>
  )
}

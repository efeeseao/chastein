import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useUpdateUserMutation, useDeleteUserMutation } from './UsersApiSlice'
import { ROLES } from '@/config/roles'
import { useTitle } from '@/hooks/useTitle'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const EditUserForm = ({ user }) => {
  useTitle('Editar Usuário')
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror }
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess || isDelSuccess) {
      setUsername('')
      setEmail('')
      setPassword('')
      setRoles([])
      navigate('/dashboard/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setRoles(values)
  }

  const onActiveChanged = () => setActive((prev) => !prev)

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        email,
        password,
        roles,
        active
      })
    } else {
      await updateUser({ id: user.id, username, email, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  let canSave
  if (password) {
    canSave =
      [roles.length, validUsername, validEmail, validPassword].every(Boolean) &&
      !isLoading
  } else {
    canSave =
      [roles.length, validUsername, validEmail].every(Boolean) && !isLoading
  }

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validUserClass = !validUsername ? 'form-input--incomplete' : ''
  const validEmailClass = !validEmail ? 'form-input--incomplete' : ''
  const validPwdClass =
    password && !validPassword ? 'form-input--incomplete' : ''
  const validRolesClass = !roles.length ? 'form-input--incomplete' : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <section className="section-form">
        <h2>Editar Usuário</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className={`form-input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />

          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className={`form-input ${validEmailClass}`}
            id="email"
            name="email"
            type="text"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />

          <label className="form-label" htmlFor="password">
            Senha
          </label>
          <input
            className={`form-input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <label
            className="form-label checkbox-container"
            htmlFor="user-active"
          >
            ACTIVO
            <input
              className="form-checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </label>

          <div className="form-action">
            <label className="form-label" htmlFor="roles">
              FUNÇÕES:
            </label>
            <select
              id="roles"
              name="roles"
              className={`form-select ${validRolesClass}`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>

          <div className="form-row">
            <div className="action-buttons">
              <button
                className="save-button"
                title="Salvar"
                onClick={onSaveUserClicked}
                disabled={canSave}
              >
                Salvar
              </button>
              <button
                className="delete-button"
                title="Apagar"
                onClick={onDeleteUserClicked}
              >
                Apagar
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  )

  return content
}

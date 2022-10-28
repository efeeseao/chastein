import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useAddNewUserMutation } from './UsersApiSlice'
import { ROLES } from '@/config/roles'
import { useTitle } from '@/hooks/useTitle'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

const NewUserForm = () => {
  useTitle('Novo Usuário')

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(['Employee'])

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
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setEmail('')
      setRoles([])
      navigate('/dashboard/users')
    }
  }, [isSuccess, navigate])

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

  const canSave =
    [roles.length, validUsername, validEmail, validPassword].every(Boolean) &&
    !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, email, password, roles })
    }
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validUserClass = !validUsername ? 'form-input--incomplete' : ''
  const validEmailClass = !validEmail ? 'form.input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form-input--incomplete' : ''
  const validRolesClass = !roles.length ? 'form-input--incomplete' : ''

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <section className="section-form">
        <h2>Adicionar novo Usuário</h2>
        <form className="form" onSubmit={onSaveUserClicked}>
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className={`form-input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            placeholder="Username"
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
            placeholder="email"
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
            placeholder="Senha"
            onChange={onPasswordChanged}
          />

          <div className="form-action">
            <label className="form-label" htmlFor="roles">
              FUNÇÃO:
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
          <button className="save-button" title="Save" disabled={!canSave}>
            Salvar
          </button>
        </form>
      </section>
    </>
  )
}
export default NewUserForm

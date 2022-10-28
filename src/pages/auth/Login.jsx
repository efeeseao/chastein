import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCredentials } from './AuthSlice'
import { useLoginMutation } from './AuthApiSlice'
import { Loading } from '@/components'
import { usePersist } from '@/hooks/usePersist'
import { useTitle } from '@/hooks/useTitle'

const Login = () => {
  useTitle('Login | Clínica Chastein')

  const userRef = useRef()
  const errorRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMsg('')
  }, [password, username])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { accessToken } = await login({ password, username }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setPassword('')
      setUsername('')

      navigate('/dashboard')
    } catch (error) {
      if (!error.status) {
        setErrorMsg('Sem resposta do servidor')
      } else if (error.status === 400) {
        setErrorMsg('Senha e username em falta')
      } else if (error.status === 401) {
        setErrorMsg('Username ou Senha inválido')
      } else {
        setErrorMsg(error.data?.message)
      }

      errorRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist((prev) => !prev)

  const errorClass = errorMsg ? 'errormsg' : 'offscreen'

  if (isLoading) {
    return (
      <div className="isLoading">
        <Loading />
      </div>
    )
  }

  return (
    <section className="login">
      <h2>Fazer login</h2>

      <p ref={errorRef} className={errorClass} aria-live="assertive">
        {errorMsg}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="input"
          type="text"
          id="username"
          placeholder="Seu username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Sua senha"
          value={password}
          onChange={handlePasswordInput}
          autoComplete="off"
          required
        />

        <button className="submit-form">Entrar</button>

        <label htmlFor="persist" className="persist">
          <input
            type="checkbox"
            className="checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Confio nesse dispositivo
        </label>
      </form>
    </section>
  )
}

export default Login

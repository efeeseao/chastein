import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRightFromBracket,
  faFilePen,
  faUserGear,
  faUserPlus,
  faFileCirclePlus
} from '@fortawesome/free-solid-svg-icons'

import { useSendLogoutMutation } from '@/pages/auth/AuthApiSlice'
import Loading from '@/components/Loading'
import { useAuth } from '@/hooks/useAuth'

const DASH_REGEX = /^\/dashboard(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/
const NOTES_REGEX = /^\/dashboard\/notes(\/)?$/

const DashHeader = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isAdmin, isManager } = useAuth()

  const [sendLogout, { error, isError, isLoading, isSuccess }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onNewNoteClicked = () => navigate('/dashboard/notes/new')
  const onNewUserClicked = () => navigate('/dashboard/users/new')
  const onNotesClicked = () => navigate('/dashboard/notes')
  const onUsersClicked = () => navigate('/dashboard/users')

  let dashClass = null
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = 'dashboard-header small'
  }

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="menu-button"
        title="Novo nota"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="menu-button"
        title="Novo usuário"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    )
  }

  let userButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dashboard')) {
      userButton = (
        <button
          className="menu-button"
          title="Usuários"
          onClick={onUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      )
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dashboard')) {
    notesButton = (
      <button className="menu-button" title="Notas" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    )
  }

  const logoutButton = (
    <button className="menu-button" title="Sair" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  const errorClass = isError ? 'errormsg' : 'offscreen'

  let buttonContent

  if (isLoading) {
    buttonContent = (
      <div className="isLoading">
        <Loading />
      </div>
    )
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    )
  }

  return (
    <>
      <p className={errorClass}>{error?.data?.message}</p>
      <header className="header">
        <nav className={`navbar ${dashClass}`}>
          <h1 className="navbar-logo">
            <Link to="/dashboard">CL</Link>
          </h1>
          <li className="items">{buttonContent}</li>
        </nav>
      </header>
    </>
  )
}

export default DashHeader

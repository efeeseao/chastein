import { Link } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

const Welcome = () => {
  const { isAdmin, isManager, username } = useAuth()

  return (
    <section className="welcome">
      <h1 className="welcome-title">Seja bem-vindo {username}</h1>

      <span>
        <Link to="/dashboard/notes">Ver Notas</Link>
      </span>
      <span>
        <Link to="/dashboard/notes/new">Add Nova Nota</Link>
      </span>

      {isAdmin ||
        (isManager && (
          <span>
            <Link to="/dashboard/users">Info do Usuário</Link>
          </span>
        ))}
      {isAdmin ||
        (isManager && (
          <span>
            <Link to="/dashboard/users/new">Add Novo Usuário</Link>
          </span>
        ))}
    </section>
  )
}

export default Welcome

import { useAuth } from '@/hooks/useAuth'

const DashFooter = () => {
  const { username, status } = useAuth()

  return (
    <footer className="footer">
      <h4>
        Usuário: <span>{username}</span>
      </h4>
      <h4>
        Categoria: <span>{status}</span>
      </h4>
    </footer>
  )
}

export default DashFooter

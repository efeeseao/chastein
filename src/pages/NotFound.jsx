import { Link } from 'react-router-dom'

const NotFound = () => (
  <section className="not-found">
    <h1>Oooopa! Página não encontrada</h1>
    <p>Desculpa, a página que esta buscando não existe ou foi removida</p>

    <Link to="/">Ínicio</Link>
  </section>
)

export default NotFound

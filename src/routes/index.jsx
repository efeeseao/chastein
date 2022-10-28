import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from '@/App'

export const Routers = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
)

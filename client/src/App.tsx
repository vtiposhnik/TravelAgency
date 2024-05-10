import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import AdminOnly from './components/AdminOnly'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route element={<AdminOnly />}>
          <Route path='/dashboard' element={<DashboardPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

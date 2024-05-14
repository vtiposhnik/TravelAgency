import './fonts/fonts.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import AdminOnly from './components/AdminOnly'
import TourPage from './pages/TourPage'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/tours/:tourSlug' element={<TourPage />} />
        <Route element={<AdminOnly />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
        <Route path='notFound' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

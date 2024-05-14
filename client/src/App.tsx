import './fonts/fonts.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import TourPage from './pages/TourPage'
import NotFound from './pages/NotFound'
import Profile from './components/Dashboard/Profile'
import UserOnlyPage from './components/UserOnlyPage'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/register' element={<SignUpPage />} />

        <Route element={<UserOnlyPage />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>

        <Route path='/tours/:tourSlug' element={<TourPage />} />
        <Route path='notFound' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

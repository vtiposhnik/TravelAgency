import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route element={<AdminOnly />}>
          
        </Route>
      </Routes>
    </>
  )
}

export default App

import { Link, useLocation } from 'react-router-dom'
import { Button, Avatar } from 'flowbite-react'
import { CSSProperties, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'

export default function Header() {
    const [sticky, setSticky] = useState(false)
    const path = useLocation().pathname

    const { currentUser } = useSelector((state: RootState) => state.user)

    const stickyStyle: CSSProperties = {
        top: 0,
        position: 'fixed',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
    }

    useEffect(() => {
        const stickyNavbar = () => {
            if (path.includes('login') || path.includes('register')) {
                setSticky(false)
                return
            }

            if (window.scrollY > 70) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        addEventListener('scroll', stickyNavbar)
    }, [path])

    return (
        <nav className='navbar flex lg:flex-wrap items-center justify-around p-3 bg-cyan-500 text-white' style={sticky ? stickyStyle : { position: 'static' }}>
            <div className='flex justify-around items-center'>
                <Link to="/"><img src="/logo.png" width={45} height={45} alt="logo" /><span className='text-lg mt-[0.1px] '></span></Link>
            </div>

            <div className='flex justify-between items-center gap-3'>
                {path.length > 2 ?
                    <nav className='flex gap-3'>
                        <Link to='/'>Главная</Link>
                        <Link to='/'>О нас</Link>
                        <Link to='/'>Услуги</Link>
                        <Link to='/'>Туры</Link>
                        <Link to='/'>Контакты</Link>
                    </nav> :
                    <nav className="flex gap-3">
                        <a href="#hero">Главная</a>
                        <a href="#about">О нас</a>
                        <a href="#services">Услуги</a>
                        <a href="#tours">Туры</a>
                        <a href="#contact">Контакты</a>
                    </nav>}
            </div>

            <aside className='ml-4'>
                {currentUser ? <Link to='/dashboard'>
                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                </Link>
                    : <Button className='bg-cyan-400'>
                        <Link to='/login'>Войти</Link>
                    </Button>}
            </aside>
        </nav>
    )
}

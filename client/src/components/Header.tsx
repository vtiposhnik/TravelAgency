import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Avatar, Dropdown, Navbar } from 'flowbite-react'
import { CSSProperties, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'

export default function Header() {
    const [sticky, setSticky] = useState(false)
    const path = useLocation().pathname
    const navigate = useNavigate()

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

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <Navbar className='navbar flex lg:flex-wrap items-center justify-around bg-cyan-500 text-white' style={sticky ? stickyStyle : { position: 'static' }}>
            <div className='logo flex justify-around items-center'>
                <Link to="/"><img src="https://firebasestorage.googleapis.com/v0/b/travel-69aa2.appspot.com/o/logo.png?alt=media&token=0d59d61b-189f-4e6a-97e9-5def7492be20" width={45} height={45} alt="logo" /><span className='text-lg mt-[0.1px] '></span></Link>
            </div>

            <div className='flex justify-between items-center gap-3 order-3 md:order-2'>
                {path.length > 2 ?
                    <Navbar.Collapse >
                        <Navbar.Link className='cursor-pointer' onClick={handleNavigate}><span>Главная</span></Navbar.Link>
                        <Navbar.Link className='cursor-pointer' onClick={handleNavigate}><span>О нас</span></Navbar.Link>
                        <Navbar.Link className='cursor-pointer' onClick={handleNavigate}><span>Услуги</span></Navbar.Link>
                        <Navbar.Link className='cursor-pointer' onClick={handleNavigate}><span>Туры</span></Navbar.Link>
                        <Navbar.Link className='cursor-pointer' onClick={handleNavigate}><span>Контакты</span></Navbar.Link>
                    </Navbar.Collapse> :
                    <Navbar.Collapse >
                        <Navbar.Link href='#hero' ><span>Главная</span></Navbar.Link>
                        <Navbar.Link href='#about' ><span>О нас</span></Navbar.Link>
                        <Navbar.Link href='#services' ><span>Услуги</span></Navbar.Link>
                        <Navbar.Link href='#tours' ><span>Туры</span></Navbar.Link>
                        <Navbar.Link href='#contact' ><span>Контакты</span></Navbar.Link>
                    </Navbar.Collapse>}
                <Navbar.Toggle />

                <aside className='ml-4'>
                    {currentUser ? <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar className='w-14' alt="User settings" img="https://firebasestorage.googleapis.com/v0/b/travel-69aa2.appspot.com/o/user-3.jpg?alt=media&token=0f31e7e3-bedb-43e3-b939-64b5b84cdf8e" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="dropdown-username block text-sm">{currentUser.username}</span>
                            </Dropdown.Header>

                            <Dropdown.Item><Link to='/dashboard'>Профиль</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='/dashboard'>Настройки</Link></Dropdown.Item>
                            <Dropdown.Divider />
                        </Dropdown>
                    </div>
                        :
                        <Link to='/login'>
                            <Button className='bg-cyan-400'>Войти</Button>
                        </Link>
                    }
                </aside>
            </div>
        </Navbar>
    )
}

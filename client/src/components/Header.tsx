import { Link } from 'react-router-dom'
import { Button } from 'antd'

export default function Header() {
    return (
        <section className='flex flex-wrap items-center justify-around p-3'>
            <div className='flex justify-around items-center'>
                <Link to="/"><img src="/logo.png" width={45} height={45} alt="logo" /><span className='text-lg mt-[0.1px] '></span></Link>
            </div>

            <div className='flex justify-between items-center gap-3'>
                <nav className="flex gap-3">
                    <Link to="/">Home</Link>
                    <Link to="#about">About</Link>
                    <Link to="/tours">Tours</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                <aside>
                    <Button>
                        Sign In
                    </Button>
                </aside>
            </div>
        </section>
    )
}

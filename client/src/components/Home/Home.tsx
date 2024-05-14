import { Link } from "react-router-dom";
import { Heading1 } from "../Typography";

export default function Home() {
    return (
        <section className="home hero-wrapper lg:h-[calc(100vh-3rem)]" id="hero">
            <div className="hero-content">
                <Heading1>
                    ваш личный проводник
                </Heading1>
                <p className="w-[60%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam unde voluptas laboriosam alias rerum assumenda.</p>
                <button className="bg-cyan-500" >
                    <Link to='/tours'>Начать</Link>
                </button>
            </div>
        </section>
    )
}

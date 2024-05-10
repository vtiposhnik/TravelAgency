import { Link } from "react-router-dom";
import { Heading1 } from "../Typography";

export default function Home() {
    return (
        <section className="hero-wrapper lg:h-[calc(100vh-3rem)]" id="hero">
            <div className="hero-content text-center">
                <Heading1>
                    Home
                </Heading1>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button>
                    <Link to='/tours'>Explore</Link>
                </button>
            </div>
        </section>
    )
}

import Home from "../components/Home/Home"
import About from "../components/Home/About"
import Tours from "../components/Home/Tours"
import Services from "../components/Home/Services"

export default function HomePage() {
    return (
        <section>
            <Home />
            <About />
            <Tours />
            <Services />
        </section>
    )
}

import { Link } from "react-router-dom"
import { TruncateText } from "../UtilComps"
import { Heading2 } from "../Typography"
import { useEffect, useState } from "react"
import { fetchTours } from "../../constants/fetch"
import { ITours, initialTourState } from "../../constants/interfaces"

export default function Tours() {
    const [tours, setTours] = useState<ITours[]>([initialTourState])

    useEffect(() => {
        // console.log(path, "also", path.pathname)
        const getTour = async () => {
            fetchTours()
                .then(data => {
                    setTours(data.tours)
                    console.log(data.message)
                })
                .catch(error => {
                    console.error(error)
                })
        }
        getTour()
    }, [])

    return (
        <section className="p-5 relative text-center" id="tours">
            <Heading2> Популярные туры </Heading2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 py-12 px-4 lg:py-20">
                {tours.slice(0, 3).map((tour) => {
                    return (
                        <div className="shadow-md relative border" key={tour._id}>
                            <img className=" w-full object-cover h-[300px]" src={tour.coverImg} alt={tour.summary} />
                            <div className="p-4 flex flex-col">
                                <TruncateText text={tour.description} maxLength={100} />
                                <Link to={`/tours/${tour.slug}`} className="text-cyan-600 mt-2.5">Узнать больше... </Link>
                            </div>
                            <div className="top-[1rem] left-[1rem] absolute">
                                <i className="inline-block p-2 bg-[rgba(255,255,255,0.5)] rounded-md">{tour.duration} дней</i>
                                <i className="inline-block p-2 bg-[rgba(255,255,255,0.5)] rounded-md ml-3">${tour.price}</i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
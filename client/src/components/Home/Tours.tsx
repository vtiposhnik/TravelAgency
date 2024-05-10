import { Link } from "react-router-dom"
import { tours } from "../../constants/tours"
import { TruncateText } from "../UtilComps"
import { Heading2 } from "../Typography"
import { Button } from "flowbite-react"

export default function Tours() {

    return (
        <section className="p-5 relative" id="tours">
            <Heading2> Popular Tours </Heading2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 py-12 px-4 lg:py-20">
                {tours.filter(tours => tours.featured).map((tour) => {
                    return (
                        <div className="shadow-md relative border" key={tour._id}>
                            <img className=" w-full object-cover h-[300px]" src={tour.image1} alt={tour.summary} />
                            <div className="p-4 flex flex-col">
                                <TruncateText text={tour.description} maxLength={100} />
                                <Link to={`/posts/:postId`}>Read More </Link>
                            </div>
                            <div className="top-[1rem] left-[1rem] absolute">
                                <i className="inline-block p-2 bg-[rgba(255,255,255,0.5)] rounded-md">{tour.duration} days</i>
                                <i className="inline-block p-2 bg-[rgba(255,255,255,0.5)] rounded-md ml-3">${tour.price}</i>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Button outline size='lg' className="absolute right-8 bottom-4">
                All Tours
            </Button>
        </section>
    )
}
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
import { useEffect, useState } from "react";
import Intro from "../components/TourPage/Intro";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTour } from "../constants/fetch";
import { ITours, initialTourState } from "../constants/interfaces";
import TourHeader from "../components/TourPage/TourHeader";
import TourOverview from "../components/TourPage/TourOverview";
import TourGallery from "../components/TourPage/TourGallery";

export default function TourPage() {
    const { tourSlug } = useParams();
    const navigate = useNavigate()

    const [tour, setTour] = useState<ITours>(initialTourState)
    const [message, setMessage] = useState('')

    useEffect(() => {
        // console.log(path, "also", path.pathname)
        const getTour = async () => {
            fetchTour(tourSlug || '')
                .then(data => {
                    setTour(data.tour)
                    setMessage(data.message)
                    console.log(message)
                })
                .catch(error => {
                    navigate('/notFound')
                    console.error(error)
                })
        }
        getTour()
    }, [tourSlug])

    return (
        <section className="text-center w-[65vw] mx-auto">
            <Intro name={tour.name} />
            <TourHeader startPoint={tour.startLoc} rating={tour.ratingAvg} price={tour.price} />
            <div className="">
                <img src={tour.coverImg} alt={tour.name} />
            </div>
            <TourOverview summary={tour.summary} description={tour.description} duration={tour.duration} difficulty={tour.difficulty} groupSize={tour.maxPeople} />
            <TourGallery images={tour.images} coverImg={tour.coverImg} />
        </section>
    )
}

import { Heading2 } from "../Typography";

export default function TourGallery({ images, coverImg }: { images: string[], coverImg: string }) {
    return (
        <section>
            <Heading2> Моменты из тура </Heading2>
            <div id="gallery" className="gallery grid-cols-8 grid-rows-8 mt-8">
                <img src={coverImg} alt="cover image" className="object-cover size-[100%] col-span-6 row-span-6" />
                <img src={images[0]} alt="image 1" className="object-cover size-[100%] col-span-2 row-span-2" />
                <img src={images[1]} alt="image 2" className="object-cover size-[100%] col-span-2 row-span-2" />
                <img src={images[2]} alt="image 3" className="object-cover size-[100%] col-span-2 row-span-2" />
            </div>
        </section>
    )
}

import { Button } from "flowbite-react";
import { HiLocationMarker } from "react-icons/hi";

export default function TourHeader({ startPoint, rating, price }: { startPoint: string, rating: number, price: number }) {
    return (
        <header className="flex md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-[50%] border my-8">
            <div className="border p-3 flex items-center justify-around text-nowrap"><i><HiLocationMarker size={30} color="red" className="align-middle" /></i> {startPoint}</div>
            <div className="border p-3 "><span className="">Рейтинг: </span>{rating}</div>
            <div className="border p-3">Цена: {price}</div>
            <Button className="p-3 rounded-none">
                Забронировать
            </Button>
        </header>
    )
}

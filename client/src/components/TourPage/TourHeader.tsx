import { Button } from "flowbite-react";

export default function TourHeader({ startPoint, rating, price }: {startPoint: string, rating: number, price: number}) {
    return (
        <header className="grid grid-cols-4 mx-auto max-w-[50%] border">
            <div>{startPoint}</div>
            <div>{rating}</div>
            <div>{price}</div>
            <Button>
                Book now
            </Button>
        </header>
    )
}

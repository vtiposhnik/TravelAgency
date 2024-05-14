import { Heading2 } from "../Typography";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiCalendar, FiTrendingUp, FiUser } from "react-icons/fi";

interface TourProps { summary: string, description: string, duration: number, difficulty: string, groupSize: number }

export default function TourOverview({ summary, description, duration, difficulty, groupSize }: TourProps) {
    const date = new Date().toLocaleDateString()
    console.log(date)

    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-8">
            <div className="overview-box text-left">
                <Heading2>
                    Обзор тура
                </Heading2>

                <aside className="labels mt-5">
                    <div>
                        <span><FiCalendar className='icon' />Следующий тур</span> {date}
                    </div>
                    <div>
                        <span><AiOutlineClockCircle className='icon' />Длительность</span> {duration} дней
                    </div>
                    <div>
                        <span><FiTrendingUp className='icon' />Сложность</span> {difficulty}
                    </div>
                    <div>
                        <span><FiUser className='icon' />Участников </span> {groupSize} человек
                    </div>
                </aside>
            </div>

            <div className="p-4 text-left">
                <span className="text-lg text-gray-500">
                    {summary}
                </span>
                <p className="text-sm mt-1">
                    {description}
                </p>
            </div>
        </section>
    )
}
import { Heading2 } from "../Typography";
import { services } from "../../constants/services";

export default function Services() {
    return (
        <section className='p-5 text-center min-h-[100vh] grid'>
          <Heading2 children='Our Services' />
          <div className='grid lg:grid-cols-4 md:grid-cols-2 text-center gap-6 mt-5'>
            {services.map(service => (
              <div key={service.alt} className="flex flex-col gap-2 items-center">
                <img src={service.src} alt={service.alt} className="w-[50%] " />
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
                <div className='blob'></div>
              </div>
            ))}
          </div>
        </section>
      )
}
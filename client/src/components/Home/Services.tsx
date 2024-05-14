import { Heading2 } from "../Typography";
import { services } from "../../constants/services";

export default function Services() {
    return (
        <section className='p-5 text-center min-h-[70vh] grid' id="services">
          <Heading2 children='Наши Услуги' />
          <div className='grid lg:grid-cols-4 md:grid-cols-2 text-center gap-6 mt-16 p-8'>
            {services.map(service => (
              <div key={service.alt} className="flex flex-col gap-2 items-center">
                <img src={service.src} alt={service.alt} className="w-[30%] " />
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
                <div className='blob'></div>
              </div>
            ))}
          </div>
        </section>
      )
}
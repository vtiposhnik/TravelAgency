import { Heading1 } from "../Typography";

export default function Intro({name}: {name: string}) {

    return (
        <section>
            <Heading1>{name}</Heading1>
        </section>
    )
}

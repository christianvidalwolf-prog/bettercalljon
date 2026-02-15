import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { HallOfFame } from "@/components/sections/HallOfFame";
import { Contact } from "@/components/sections/Contact";
import { client } from "@/sanity/lib/client";
import { servicesListQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
    // Obtener servicios desde Sanity
    const services = await client.fetch(servicesListQuery);

    return (
        <>
            <Hero />
            <Services services={services} />
            <HallOfFame />
            <Contact />
        </>
    );
}

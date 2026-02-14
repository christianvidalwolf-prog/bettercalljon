import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { HallOfFame } from "@/components/sections/HallOfFame";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
    return (
        <>
            <Hero />
            <Services />
            <HallOfFame />
            <Contact />
        </>
    );
}

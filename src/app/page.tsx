import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";

export default function Home() {
    return (
        <main className="relative  -mt-[120vh] pt-[120vh] text-white">
            <ContactUs />
            <Events />
            <Sponsors />
        </main>
    );
}

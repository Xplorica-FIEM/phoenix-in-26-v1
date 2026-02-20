import ContactUs from "./contact";
import EventsMarquee from "./events/EventsMarquee";
import Sponsors from "./sponsors";
import FAQs from "./faq";
import AboutPhoenix from "./about";

export default function Home() {
    return (
        <div className="relative text-white">
            <AboutPhoenix />
            <EventsMarquee />
            <Sponsors />
            <ContactUs />
            <FAQs />
        </div>
    );
}

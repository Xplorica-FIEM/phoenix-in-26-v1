import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";
import FAQs from "./faq";
import AboutPhoenix from "./about";

export default function Home() {
    return (
        <div className="relative text-white">
            <AboutPhoenix />
            <Events />
            <Sponsors />
            <ContactUs />
            <FAQs />
        </div>
    );
}

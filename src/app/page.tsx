import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";
import FAQs from "./faq";
import Trainers from "./trainers/page";
import AboutPhoenix from "./about";



export default function Home() {
    return (
        <main className="relative text-white">
            <AboutPhoenix />
            <Events />
            <Sponsors />
            <ContactUs />
            <FAQs />
        </main> 
    );
}

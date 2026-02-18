import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";
import FAQs from "./faq";
import Trainers from "./trainers";
import AboutPhoenix from "./about";



export default function Home() {
    return (
        <main className="relative  -mt-[120vh] pt-[120vh] text-white">
            <AboutPhoenix />
            <Trainers />
            <Events />
            <Sponsors />
            <ContactUs />
            <FAQs />
        </main> 
    );
}

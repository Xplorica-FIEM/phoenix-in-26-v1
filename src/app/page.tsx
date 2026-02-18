import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";
import FAQs from "./faq";
import Gallery from "./gallery";
import Trainers from "./trainers";



export default function Home() {
    return (
        <main className="relative  -mt-[120vh] pt-[120vh] text-white">
            <Events />
            <Gallery />
            <Sponsors />
            <Trainers />
            <ContactUs />
            <FAQs />
        </main> 
    );
}

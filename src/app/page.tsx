import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";
import FAQs from "./faq";
import Trainers from "./trainers";



export default function Home() {
    return (
        <main className="relative  -mt-[120vh] pt-[120vh] text-white">
            <Trainers />
            <Events />
            <Sponsors />
            <ContactUs />
            <FAQs />
        </main> 
    );
}

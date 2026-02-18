import ContactUs from "./contact";
import Events from "./event";
import Sponsors from "./sponsors";
import FAQs from "./faq";




export default function Home() {
    return (
        <main className="relative  -mt-[120vh] pt-[120vh] text-white">
            <ContactUs />
            <Events />
            <Sponsors />
            <FAQs />
        </main> 
    );
}

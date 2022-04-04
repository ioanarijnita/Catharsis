import { EventItem } from "../components/event-item";
import faust from "../assets/faust.png"
import { Footer } from "../components/Footer";
import { Header } from "../components/header";

export function EventPage() {
    const eventObject = {
        image: {faust},
        title: "Faust",
        reviewsCount: 23,
        description: "Ceva misto la Faust",
        price: 150

    };
    const eventsItems = [eventObject, eventObject, eventObject, eventObject, eventObject];

    return (
        <div>
            <Header></Header>
            <br></br><br></br><br></br><br></br>
            <div style = {{display: "flex", flexWrap: "wrap"}}>
            {
                eventsItems.map((item) => <EventItem
                image={item.image.faust}
                title={item.title}
                reviewsCount={item.reviewsCount}
                description={item.description}
                price={item.price}
                
                ></EventItem>)
            }
            </div>
       
            <Footer></Footer>
        </div>
    );
}

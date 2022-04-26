import { EventItem } from "../components/event-item";
import { Footer } from "../components/Footer";
import { Header } from "../components/header";
import { useEventService } from "../contexts/events-context";
import { useEffect } from "react";

export function EventPage() {
    const event = useEventService();

    useEffect(() => {
        event.getEvents();
    }, [])

    return (
        <div>
            <Header></Header>
            <br></br><br></br><br></br><br></br>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {event.eventList && event.eventList.map((item) => <EventItem
                    image={item.url.image}
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

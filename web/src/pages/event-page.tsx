import { EventItem } from "../components/event-item";
import { Footer } from "../components/Footer";
import { Header } from "../components/header";
import { EventType, useEventService } from "../contexts/events-context";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function EventPage() {
    const event = useEventService();
    const location = useLocation();
    const events = location.state as EventType[];

    useEffect(() => {
        event.getEvents();
    }, [])

    return (
        <div>
            <Header></Header>
            <br></br><br></br><br></br><br></br>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {(events ? events : event.eventList).map((item) => <EventItem
                    key={item.title}
                    image={item.image}
                    title={item.title}
                    reviewsCount={item.reviewsCount}
                    description={item.description}
                    price={item.price}
                    location = {item.location}
                    date = {item.date}
                ></EventItem>)
                }
            </div>
            <Footer></Footer>
        </div>
    );
}

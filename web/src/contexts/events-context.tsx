import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import faust from "../assets/faust.png"

export type EventType = {
    url: {
        image: string
    },
    title: string,
    reviewsCount: number,
    description: string,
    price: number
}

type EventsContext = ReturnType<typeof useEventsService>
const EventsContext = createContext<EventsContext>(null!);

export function useEventService() {
    return useContext(EventsContext);
}

function useEventsService() {
    const eventObject: EventType = {
        url: { image: faust },
        title: "Faust",
        reviewsCount: 23,
        description: "Ceva misto la Faust",
        price: 150
    };
    const [eventList, setEventList] = useState<typeof eventObject[]>([]);


    const getEvents = () => {
        const eventsItems = [eventObject, eventObject, eventObject, eventObject, eventObject];
        setEventList(eventsItems);
        return eventsItems;
    }
    const nav = useNavigate();

    return useMemo(() => ({
        getEvents,
        eventList
    }), [eventObject])
}

export function EventContextProvider(props: { children: JSX.Element }) {
    const eventsService = useEventsService();
    return <EventsContext.Provider value={eventsService}>
        {props.children}
    </EventsContext.Provider>
}

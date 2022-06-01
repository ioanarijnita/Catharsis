import { createContext, useContext, useMemo, useState } from "react";
import EventDataService from "../services/event";

export type EventType = {
    image: string,
    title: string,
    reviewsCount: number,
    description: string,
    price: number,
    date: Date,
    location: string
}

type EventsContext = ReturnType<typeof useEventsService>
const EventsContext = createContext<EventsContext>(null!);

export function useEventService() {
    return useContext(EventsContext);
}

function useEventsService() {
    const [eventList, setEventList] = useState<EventType[]>([]);

    const getEvents = () => {
        EventDataService.findAll().then((res) => {
            setEventList(res.data);
        })
    }

    return useMemo(() => ({
        getEvents,
        eventList
    }), [eventList])
}

export function EventContextProvider(props: { children: JSX.Element }) {
    const eventsService = useEventsService();
    return <EventsContext.Provider value={eventsService}>
        {props.children}
    </EventsContext.Provider>
}

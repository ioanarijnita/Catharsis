import { EventType } from "../models/event";
import http from "../http-common";

class EventDataService {
    create(data: EventType) {
        return http.post("/events", data);
    }
    findAll() {
        return http.get("/events");
    }
    edit(data: EventType) {
        return http.put(`/events/${data.id}`, data);
    }
}

export default new EventDataService();

import { useLocation } from "react-router"
import { Header } from "../components/header";
import { RoomPlan } from "./room-plan";

export function UserPlan() {
    const location = useLocation();
    const event = location.state as any;
    const obj = JSON.parse(event.plan) as any;
    return <div>
        <Header />
        <div style={{ margin: 30 }}>
            <h4>{event.title}</h4>
            {/* ts-ignore */}
            <RoomPlan event={event} seats={JSON.parse(obj.data)} fullSeats={obj} rowLength={JSON.parse(obj.data)[0].length} id={JSON.parse(event.plan).id} />
        </div>
    </div>
}

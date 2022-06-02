import { useLocation } from "react-router"
import { Header } from "../components/header";
import { RoomPlan } from "./room-plan";

export function UserPlan() {
    const location = useLocation();
    const event = location.state as any;
    const obj = JSON.parse(event.plan) as any;
    return <div>
        <Header />
        <div style={{ margin: 20 }}>
            <h2>Title: {event.title}</h2>
            {/* ts-ignore */}
            <p style = {{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <span>Blue: <span style = {{color: "#2196f3"}}><b>Empty Seats</b></span></span>
                <span>Green: <span style = {{color: "green"}}><b>Your Seats</b></span></span>
                <span>Gray: <span style = {{color: "gray"}}><b>Taken Seats</b></span></span>
            </p>
            <RoomPlan isCheckout event={event} seats={JSON.parse(obj.data)} fullSeats={obj} rowLength={JSON.parse(obj.data)[0].length} id={JSON.parse(event.plan).id} />
        </div>
    </div>
}

import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { useEventService } from "../contexts/events-context";

export function LocationsPage() {
    const cityList = ["Timisoara", "Motru", "Bucuresti", "Iasi", "Bacau", "Constanta", "Rasnov", "Arad", "Oradea", "Tecuci", "Vaslui", "Suceva", "Galati"]; // mock data
    const nav = useNavigate();
    const { eventList } = useEventService();
    return <div>
        <Header />
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#217DA2", color: "white", width: 180, marginLeft: 110, marginTop: 20, paddingBottom: 20 }}>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
                City List
            </p>
            {cityList.map(item => <span
                key={item}
                onClick={() => {
                    const data = eventList.filter(event => event.location === item);
                    nav("/events", { state: data });
                }}
                style={{ textAlign: "center", cursor: "pointer", margin: "0 auto" }}
            >
                {item}
            </span>)}
        </div>
    </div>
}

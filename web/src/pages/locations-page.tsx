import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/header";
import { useEventService } from "../contexts/events-context";

export function LocationsPage() {
    const cityList = ["Timisoara", "Motru", "Bucuresti", "Iasi", "Bacau", "Constanta", "Rasnov", "Arad", "Oradea", "Tecuci", "Vaslui", "Suceva", "Galati"]; // mock data
    const nav = useNavigate();
    const { eventList } = useEventService();
    return <div>
        <Header />
        <div style={{ margin: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
                City List
            </p>
            <Box boxShadow={4} style={{ width: "95%", display: "flex", flexDirection: "column" }}>
                {cityList.map(item => <div
                    key={item}
                    style={{ marginTop: 15, marginLeft: 20, marginRight: 20 }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "bold" }}>
                            {item}
                        </span>
                        <Button onClick={() => {
                            const data = eventList?.filter(event => event.location === item);
                            nav("/events", { state: data });
                        }} variant="outlined" size="small"><b>CHECK EVENTS</b></Button>
                    </div>
                    {item !== cityList[cityList.length - 1] && <hr />}
                </div>)}
            </Box>
        </div>
        <Footer />
    </div>
}

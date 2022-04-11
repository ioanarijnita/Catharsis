import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const nav = useNavigate();
    return <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <p style={{ cursor: "pointer" }} onClick={() => nav("/")}>
            Catharsis
        </p>
        <p style={{ cursor: "pointer" }}>
            Events
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => nav("/locations")}>
            Locations
        </p>
        <AccountCircleIcon style={{ cursor: "pointer" }} />
    </div>
}

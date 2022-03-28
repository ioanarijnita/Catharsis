import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function Header() {
    return <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <p>
            Catharsis
        </p>
        <p style={{ cursor: "pointer" }}>
            Events
        </p>

        <p style={{ cursor: "pointer" }}>
            Locations
        </p>
        <AccountCircleIcon style={{ cursor: "pointer" }} />
    </div>
}

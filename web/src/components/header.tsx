import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../contexts/auth-context';

export function Header() {
    const nav = useNavigate();
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const auth = useAuthService();

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
        <div style={{ flexDirection: "column" }}>
            <AccountCircleIcon style={{ cursor: "pointer" }} onClick={() => setIsAccountModalOpen(!isAccountModalOpen)} />
            {isAccountModalOpen && <Box boxShadow={5} style={{
                width: 100,
                backgroundColor: "white",
                borderRadius: 4,
                position: "fixed",
                marginLeft: -35
            }}>
                <Button variant="text" onClick={!auth.loginInfo ? () => nav("/login") : () => auth.logout()} style={{ width: "100%" }}>{auth.loginInfo ? "LOG OUT" : "LOG IN"}</Button>
                {!auth.loginInfo && <Button variant="text" onClick={() => nav("/signup")} style={{ width: "100%" }}>Register</Button>}
            </Box>
            }
        </div>

    </div>
}

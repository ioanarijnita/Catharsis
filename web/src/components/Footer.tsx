import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FacebookIcon from '@mui/icons-material/Facebook';

export function Footer() {
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            showLabels
            style={{ backgroundColor: "#2196f3", width: "100%", justifyContent: "space-around", position: "sticky"  }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction style={{ color: value === 0 ? "white" : "lightgray" }} label="Catharsis" icon={<CopyrightIcon />} />
            <BottomNavigationAction style={{ color: value === 1 ? "white" : "lightgray" }} label="Contact" icon={<ContactPageIcon />} />
            <BottomNavigationAction style={{ color: value === 2 ? "white" : "lightgray" }} label="Facebook" icon={<FacebookIcon />} />
        </BottomNavigation>
    );
}

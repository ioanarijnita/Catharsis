import { Box } from "@mui/material";

export function AuthentificationModal(p: { children: JSX.Element }) {
    return <Box boxShadow={3} style={{
        width: 424,
        backgroundColor: "white",
        borderRadius: 4,
        marginTop: "2%",
    }}>
        {p.children}
    </Box>
}

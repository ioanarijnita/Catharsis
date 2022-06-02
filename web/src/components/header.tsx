import { AccountCircle } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../contexts/auth-context';
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
    const nav = useNavigate();
    const auth = useAuthService();
    const [authentication, setAuthentication] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthentication(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={(e) => setAnchorEl2(e.currentTarget)}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl2}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl2)}
                    onClose={() => setAnchorEl2(null)}
                >
                    <MenuItem onClick={() => {
                        nav("/events")
                    }}>Events</MenuItem>
                    <MenuItem onClick={() => {
                        nav("/locations");
                    }}>Locations</MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ cursor: "pointer" }} onClick={() => nav("/")}>
                    Catharsis
                </Typography>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {auth.loginInfo ?
                            <MenuItem onClick={() => {
                                auth.logout();
                            }}>Log Out</MenuItem> :
                            <>
                                <MenuItem onClick={() => {
                                    nav("/login")
                                }}>Log In</MenuItem>
                                <MenuItem onClick={() => {
                                    nav("/signup");
                                }}>Register</MenuItem>
                            </>
                        }
                        {auth.loginInfo?.email === "admin@admin.com" && <MenuItem onClick={() => {
                            nav("/admin");
                        }}>Add Events</MenuItem>}
                    </Menu>
                </div>

            </Toolbar>
        </AppBar>
    </div>
}

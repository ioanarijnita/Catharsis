import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Footer } from '../components/Footer';
import { Header } from '../components/header';
import SearchIcon from '@mui/icons-material/Search';

export function MainPage() {
    return (
        <div>
            <Header />
            <br /><br /><br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    style={{ width: "40%" }}
                    label="Search by events or locations"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <Footer />
        </div>
    );
}

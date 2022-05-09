import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Footer } from '../components/Footer';
import { Header } from '../components/header';
import SearchIcon from '@mui/icons-material/Search';
import { EventType, useEventService } from '../contexts/events-context';
import { useEffect, useState } from 'react';
import { EventItem } from '../components/event-item';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';

export function MainPage() {
    const { getEvents, eventList } = useEventService();
    const [searchedValues, setSearchedValues] = useState<EventType[]>();
    const [value, onChange] = useState(new Date());
    const { register, handleSubmit, getValues, watch } = useForm<{ searchInput: string }>();

    useEffect(() => {
        getEvents();
    }, [])

    useEffect(() => {
        const data = eventList.filter(event => event.title === getValues("searchInput"));
        setSearchedValues(data);
    }, [watch("searchInput")])

    const onSubmit = () => {
        const data = eventList.filter(event => event.title === getValues("searchInput"));
        setSearchedValues(data);
    }
    return (
        <div>
            <Header />
            <br /><br /><br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        style={{ width: 400 }}
                        label="Search by events or locations"
                        {...register("searchInput")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {searchedValues && searchedValues.map(event => <EventItem {...event} image={event.url.image} />)}
            </div>
            <div style={{ padding: 50, display: "flex", flexDirection: "column", marginTop: 25, borderRadius: 14, marginLeft: 25 }}>
                <Calendar onChange={onChange} value={value} locale="en-US" />
                <Button variant="contained" style={{ width: 150, marginTop: 15 }}>CHECK EVENTS</Button>
            </div>
            <Footer />
        </div>
    );
}

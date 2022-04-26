import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Footer } from '../components/Footer';
import { Header } from '../components/header';
import SearchIcon from '@mui/icons-material/Search';
import { EventType, useEventService } from '../contexts/events-context';
import { useEffect, useState } from 'react';
import { updateOnChangeText } from '../hooks/utils';
import { EventItem } from '../components/event-item';

export function MainPage() {
    const { getEvents, eventList } = useEventService();
    const [searchedValues, setSearchedValues] = useState<EventType[]>();
    const searchInput = useState<{
        value: string,
    }>({
        value: "",
    });
    const [inputValue] = searchInput;
    const onSearch = () => {
        console.log(inputValue.value, searchedValues, "Faust" === inputValue.value)
        const data = eventList.filter(event => event.title === inputValue.value);
        console.log(eventList);
        setSearchedValues(data);
    }

    useEffect(() => {
        getEvents();
    }, [])
    return (
        <div>
            <Header />
            <br /><br /><br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    style={{ width: "40%" }}
                    label="Search by events or locations"
                    {...updateOnChangeText(searchInput, "value")}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={onSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {searchedValues && searchedValues.map(event => <EventItem {...event} image={event.url.image} />)}
            </div>
            <Footer />
        </div>
    );
}

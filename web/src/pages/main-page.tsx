import { BottomNavigationAction, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Footer } from '../components/Footer';
import { Header } from '../components/header';
import SearchIcon from '@mui/icons-material/Search';
import { useEventService } from '../contexts/events-context';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import moment from 'moment';
import Carousel from 'react-material-ui-carousel/dist/components/Carousel';
import './calendar.scss';

export function MainPage() {
    const { getEvents, eventList } = useEventService();
    const [value, onChange] = useState(new Date());
    const { register, handleSubmit, getValues } = useForm<{ searchInput: string }>();
    const nav = useNavigate();
    useEffect(() => {
        getEvents();
    }, [])

    const onSubmit = () => {
        const data = eventList?.filter(event => event.title.toLocaleLowerCase().includes(getValues("searchInput").toLocaleLowerCase()));
        nav("/events", { state: data });
    }

    var items = [
        {
            src1: "./hamlet.jpg",
        },
        {
            src1: "./poppins.png",
        },
        {
            src1: "./karamazov.png",
        }
    ]
    return (
        <div>
            <Header />
            <br /><br /><br />
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        style={{ width: 800 }}
                        label="Search by events"
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
                <Button onClick={() => {
                    const data = eventList?.filter(event => moment(moment(event.date).format("YYYY-MM-DD")).isSame(moment(moment(value).format("YYYY-MM-DD"))));
                    nav("/events", { state: data })
                }} variant="contained" style={{ width: 150, }}>CHECK EVENTS</Button>
            </div>
            <div style={{ padding: 50, display: "flex", flexDirection: "column", marginTop: 25, borderRadius: 14, marginLeft: 25 }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flexDirection: "column" }}>
                        <Calendar onChange={onChange} value={value} locale="en-US" />

                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Carousel>
                            {
                                items.map((item, i) => <Item key={i} item={item} />)
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function Item(props: { item: { src1: string }; }) {
    return (
        <div>
            <img src={props.item.src1} style={{ width: 450, height: 300, borderRadius: 10 }} />
        </div>
    )
}

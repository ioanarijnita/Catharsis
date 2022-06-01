import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { EventType } from '../../models/event';
import { useNavigate } from 'react-router-dom';
import EventDataService from "../../services/event";
import { AxiosResponse } from 'axios';
import { useAuthService } from '../../contexts/auth-context';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function AdminAddEvent() {

    const [showAlert, setShowAlert] = useState(0);
    const [event, setEvent] = useState<EventType>({
        description: "",
        price: 0,
        reviewsCount: 0,
        title: "",
        date: new Date(),
        location: "",
        additionalInformation: "",
        image: "",
        reviews: `[{}]`,
        runnigTime: "",
        venueInformation: "",
        id: 0,
        rating: 0
    })
    const navigate = useNavigate();
    const inputRef = React.useRef<HTMLInputElement>(null)
    const { loginInfo } = useAuthService();
    const [value, onChange] = useState(new Date());

    function showname() {
        setEvent({ ...event, image: inputRef.current?.files![0].name! })
    }

    function AlertShowing() {
        return (
            <Alert variant="outlined" onClose={() => setShowAlert(0)} severity={showAlert === 1 ? "success" : "error"}>{showAlert === 1 ? "Item added successfully!" : "Please fill in all the fields!"}</Alert>
        );
    }

    if (loginInfo?.email !== "admin@admin.com") return <></>;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: 50, marginTop: 50 }}>
            <Button
                variant="contained"
                style={{ width: 200, fontSize: 13 }}>Upload Image
                <input style={{ position: 'absolute', left: 50, opacity: 0 }} type="file" className="form-control" name="upload_file" id="fileInput" ref={inputRef} onChange={() => showname()} />
            </Button>
            <br />
            <text style={{ fontSize: 12 }}>{event.image}</text>
            <br />
            <TextField
                style={{ width: 180 }}
                value={event.title}
                onChange={(e: any) => {
                    setEvent({ ...event, title: e.target.value })
                }
                }
                label="TITLE"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <TextField
                style={{ width: 180 }}
                value={event.description}
                onChange={(e: any) => {
                    setEvent({ ...event, description: e.target.value })
                }
                }
                label="DESCRIPTION"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <TextField
                style={{ width: 180 }}
                value={event.location}
                onChange={(e: any) => {
                    setEvent({ ...event, location: e.target.value })
                }
                }
                label="LOCATION"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <TextField
                style={{ width: 180 }}
                value={event.price}
                onChange={(e: any) => {
                    setEvent({ ...event, price: e.target.value })
                }
                }
                label="PRICE"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <TextField
                style={{ width: 180 }}
                value={event.runnigTime}
                onChange={(e: any) => {
                    setEvent({ ...event, runnigTime: e.target.value })
                }
                }
                label="RUNNING TIME"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <TextField
                style={{ width: 180 }}
                value={event.venueInformation}
                onChange={(e: any) => {
                    setEvent({ ...event, venueInformation: e.target.value })
                }
                }
                label="VENUE INFORMATION"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <TextField
                style={{ width: 180 }}
                value={event.additionalInformation}
                onChange={(e: any) => {
                    setEvent({ ...event, additionalInformation: e.target.value })
                }
                }
                label="ADDITIONAL INFORMATION"
                variant="standard"
                InputLabelProps={{ style: { fontSize: 10 } }}
            /><br />
            <span>Select date for the event</span>
            <Calendar onChange={onChange} value={value} locale="en-US" />
            <br />
            {showAlert ? <AlertShowing></AlertShowing> : <></>}
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <Button onClick={() => {
                    EventDataService.findAll().then((res: AxiosResponse<any, any>) => {
                        EventDataService.create({ ...event, id: res.data.length, date: value }).then(() => setEvent({ price: 0, description: "", image: "", reviewsCount: 0, title: "", date: new Date(), location: "", additionalInformation: "", id: 0, venueInformation: "", runnigTime: "", reviews: `[{}]`, rating: 0 }))
                    })
                }} variant="outlined" style={{ marginRight: 50, backgroundColor: 'black', color: 'white' }}>ADD EVENT</Button>
                <Button variant="outlined" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => navigate("/")}>GO TO MAIN PAGE</Button>
            </div>
        </div>
    );
}

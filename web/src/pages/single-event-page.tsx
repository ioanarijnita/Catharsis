import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation, useNavigate } from "react-router";
import { EventType, useEventService } from "../contexts/events-context";
import moment from "moment";
import Button from "@mui/material/Button";
import { useAuthService } from "../contexts/auth-context";
import { Alert, Snackbar, TextField } from "@mui/material";
import EventDataService from "../services/event";
import { Footer } from "../components/Footer";

export function SingleEvent() {
    const [rating, setRating] = useState<number | null>();
    const location = useLocation();
    const event = location.state as EventType;
    const [addReview, setAddReview] = useState<string>();
    const { loginInfo } = useAuthService();
    const [reviews, setReviews] = useState<any[]>();
    const { getEvents } = useEventService();
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState<EventType>();
    const nav = useNavigate();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        try {
            const r = JSON.parse(event.reviews) as string[];
            setReviews([...r]);
            setNewItem(event);
        } catch (e) {
            console.log(e)
        }

    }, [event.reviews])
    return <div>
        <Header></Header>
        <div style={{ margin: "32px 32px 32px 32px", backgroundColor: "white", paddingTop: "1%", paddingBottom: "1%", display: "flex", flexDirection: "row" }}>
            <div style={{ marginLeft: 32, marginRight: 31 }}>
                <Button onClick={() => nav("plan", { state: event })} variant="contained" style={{ alignSelf: "flex-end", marginRight: 10, position: "absolute", right: 50 }}>BUY TICKETS</Button>

                <p style={{ fontSize: 25, fontWeight: "bold" }}>{event.title}</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                    <b>Rating:</b>
                    <Rating
                        name="simple-controlled"
                        style={{ marginLeft: 5, marginRight: 5 }}
                        value={rating ?? event.rating}
                        onChange={(event, newRating) => {
                            setRating(newRating);
                            EventDataService.edit({ ...newItem!, rating: newRating! }).then(() => getEvents())
                        }}
                    />
                    {reviews?.filter(e => Object.keys(e).length !== 0).length} review{reviews?.filter(e => Object.keys(e).length !== 0).length === 1 ? "" : "s"}
                    <span style={{ marginLeft: 50 }}><LocationOnIcon /> <span style={{ position: "relative", bottom: 5 }}>{event.location}</span> </span>
                </p>
                <p><b>Description:</b> {event.description}</p>
                <p><b>Additional Information:</b> {event.additionalInformation}</p>
                <p><b>Running time:</b> {event.runnigTime}</p>
                <p><b>Date:</b> {moment(event.date).format("YYYY-MM-DD")}</p>
                <p><b>Venue information:</b> {event.venueInformation}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexGrow: 1 }}>
                <img src={event.image} style={{}}></img>
            </div>
        </div>
        <div style={{ margin: "32px 32px 32px 32px", backgroundColor: "white", paddingTop: "1%", paddingBottom: "1%" }}>
            <div style={{ marginLeft: 32, marginRight: 31, display: "flex", flexDirection: "column" }}>
                <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p>Review section</p>
                    {loginInfo?.email && <Button size="small" variant="contained" onClick={() => setAddReview("")}>ADD</Button>}
                </div>
                {addReview !== undefined && <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                    <TextField
                        value={addReview}
                        onChange={(e) => setAddReview(e.target.value)}
                        placeholder="Add review"
                        style={{ flexGrow: 0.8 }}
                    />
                    <div style={{ flexGrow: 0.2 }}></div>
                    <Button size="medium" variant="contained" style={{ width: 130 }} onClick={() => {
                        reviews?.push({ name: loginInfo?.email, review: addReview })
                        const newValues = { ...event, reviewsCount: reviews?.length!, reviews: JSON.stringify(reviews), rating: rating! }
                        EventDataService.edit(newValues).then(() => getEvents());
                        setNewItem(newValues);
                        setAddReview("");
                        handleClick();
                    }}>SEND</Button>
                </div>}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Successfully added review!
                    </Alert>
                </Snackbar>
                {reviews?.filter(e => Object.keys(e).length !== 0).map(review => <div key={review.review}>
                    <p><b>Name:</b> {review.name}</p>
                    <p><b>Review:</b> {review.review}</p>
                </div>)}
            </div>
        </div>
        <Footer />
    </div>
}

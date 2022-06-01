import { Box, IconButton } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventType } from "../contexts/events-context";

export function EventItem(p: EventType) {
    const [rating, setRating] = useState<number | null>();
    const nav = useNavigate();
    return (
        <IconButton
            size="small"
            edge="start"
            color="inherit"
            style={{ marginLeft: 100, marginTop: 25, borderRadius: 0 }}
            onClick={() => {
                nav(`/event`, { state: p });
            }}
        >
            <Box boxShadow={4} >
                <img src={p.image} style={{ width: "100%" }}></img>
                <div style={{ marginLeft: 10 }}>
                    <p><b>Title:</b> {p.title}</p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                        <b>Rating:</b> {rating}
                        {p.reviewsCount} reviews
                    </p>
                    <p><b>Description:</b> {p.description}</p>
                    <p><b>Location:</b> {p.location} </p>
                    <p><b>Date:</b> {moment(p.date).format("DD MMMM YYYY")} </p>
                    <p style={{ paddingBottom: 10 }}><b>Price:</b> {p.price} euro </p>
                </div>
            </Box>
        </IconButton>
    );
}

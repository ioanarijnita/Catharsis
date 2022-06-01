import { Box, Rating } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

export function EventItem(p: { image: string, title: string, reviewsCount: number, description: string, price: number, location: string, date: Date }) {
    const [rating, setRating] = useState<number | null>();
    return (
        <Box boxShadow={4} style={{ marginLeft: 100, width: "22%", marginTop: 25 }} >
            <img src={`./${p.image}`} style={{ width: "100%" }}></img>
            <div style={{ marginLeft: 10 }}>
                <p><b>Title:</b> {p.title}</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                    <b>Rating:</b> {rating}
                    <Rating
                        name="simple-controlled"
                        style={{ marginLeft: 5, marginRight: 5 }}
                        value={rating}
                        onChange={(event, newRating) => {
                            setRating(newRating);
                        }}
                    />
                    {p.reviewsCount} reviews
                </p>
                <p><b>Description:</b> {p.description}</p>
                <p><b>Location:</b> {p.location} </p>
                <p><b>Date:</b> {moment(p.date).format("DD MMMM YYYY")} </p>
                <p style={{ paddingBottom: 10 }}><b>Price:</b> {p.price} euro </p>
            </div>
        </Box>
    );
}

import { Box, Rating } from "@mui/material";
import React, { useState } from "react";

export function EventItem(p: { image: string, title: string, reviewsCount: number, description: string, price: number }) {
    const [rating, setRating] = useState<number | null>();
    return (
        <Box boxShadow={4} style={{ marginLeft: 100, width: "22%", marginTop: 25 }} >
            <img src={`./${p.image}`} style={{ width: "100%" }}></img>
            <div style={{ marginLeft: 10 }}>
                <p>{p.title}</p>
                <p style={{ display: "flex", alignItems: "center" }}>
                    {rating}
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
                <p>{p.description}</p>
                <p style={{ paddingBottom: 10 }}>{p.price} euro </p>
            </div>
        </Box>
    );
}

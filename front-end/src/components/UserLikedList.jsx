import React, { useState } from "react";
import { ItemCard } from "./ItemList";
import SimplePetCard from "./SimplePetCard";
import { CircularProgress, List, ListItem } from "@mui/material";

export function UserLikedList(props) {
  const [cardOpen, setCardOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleCardOpen = (event) => {
    setCardOpen(true);
    setSelectedItemId(event.currentTarget.getAttribute("data-index"));
  };

  const handleCardClose = () => setCardOpen(false);

  return (
    <>
      {!props.data && <CircularProgress sx={props.sx} />}
      {props.data && (
        <>
            <List
                sx={props.sx}
            >
                {props.data.map((item) => (
                <>
                    <ListItem
                    alignItems="flex-start"
                    button
                    data-index={item.id}
                    onClick={handleCardOpen}
                    >
                    <SimplePetCard petInfo={item} />
                    </ListItem>
                </>
                ))}
            </List>
            <ItemCard
                open={cardOpen}
                onClose={handleCardClose}
                itemId={selectedItemId}
                data={props.data}
                card={props.card}
            />
        </>
      )}
    </>
  );
}

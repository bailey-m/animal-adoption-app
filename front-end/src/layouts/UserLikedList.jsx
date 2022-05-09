import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ItemCard } from "../components/ItemList";
import SimplePetCard from "../components/SimplePetCard";
import { Typography } from "@mui/material";

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
      {!props.data && <CircularProgress />}
      {props.data && (
        <>
            <List
                sx={{
                width: "fit-content",
                bgcolor: "background.paper"
                }}
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

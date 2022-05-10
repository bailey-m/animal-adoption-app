import * as React from "react";
import axios from "axios";
import { API_URL } from "../index";
import { useState } from "react";
import { UserLikedList } from "../components/UserLikedList";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";


export default function UserProfilePage() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    axios
      .get(
        `${API_URL}/pets`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="UserProfilePage">
      <Box 
        sx={{
          display: "grid",
          gap: 0.5,
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto',
          margin: 'auto'
        }}
      >
        <Typography sx={{gridRow: '1', gridColumn:'span 4'}} variant='h2'>User Name</Typography>
        <Typography sx={{gridRowStart: '3', gridColumn:'span 2'}} variant='body1'>User info goes here</Typography>
        <Typography sx={{gridRowStart: '2', gridColumn:'3/5' }} align="center" variant="h3">Liked Pets</Typography>
        <UserLikedList sx={{gridRowStart: '3', gridColumn:'3/5', margin: "auto" }} data={data} card="PetCard" />
      </Box>
    </div>
  );
}

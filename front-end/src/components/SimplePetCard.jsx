import React, { Component } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

class SimplePetCard extends Component {
    state = {};

    availability() {
        const gridInfo = {
            gridRow: "4",
            gridColumn: "span 4"
        };

        switch (this.props.petInfo.availability) {
            case "Available":
                return <Chip label="Available" color="success" sx={gridInfo} />;

            case "Not Available":
                return <Chip label="Not Available" color="error" sx={gridInfo} />

            case "Pending":
                return <Chip label="Pending" color="warning" sx={gridInfo} />;

            case "Adopted":
                return <Chip label="Adopted" color="primary" sx={gridInfo} />;

            default:
                return (
                    <Chip
                        label="Status Unknown"
                        color="secondary"
                        sx={gridInfo}
                    />
                );
        }
    }

    render() {
        return (
            <Card sx={{ maxWidth: 300 }} raised>
                <CardContent>
                    <Box
                        sx={{
                            display: "grid",
                            gap: 0.5,
                            gridTemplateRows: "repeat(4, 1fr)",
                            gridTemplateColumns: "repeat(8, 1fr)",
                            alignItems: "center",
                        }}
                    >
                        <CardMedia
                            component='img'
                            src={this.props.petInfo.image}
                            alt={this.props.petInfo.name}
                            sx={{
                                gridRowStart: "1",
                                gridRowEnd: "5",
                                gridColumnStart: "1",
                                gridColumnEnd: "5",
                                objectFit: 'fill'
                            }}
                        />

                        <Typography
                            align="center"
                            variant="body1"
                            sx={{
                                gridRow: "1",
                                gridColumn: "span 4"
                            }}
                        >
                            {this.props.petInfo.name}
                        </Typography>

                        <Typography
                            align="center"
                            variant="body2"
                            sx={{
                                gridRow: "2",
                                gridColumn: "span 4"
                            }}
                        >
                            {this.props.petInfo.age}
                        </Typography>

                        <Typography
                            align="center"
                            variant="body2"
                            sx={{
                                gridRow: "3",
                                gridColumn: "span 4"
                            }}
                        >
                            {this.props.petInfo.breed}
                        </Typography>

                        {this.availability()}
                    </Box>
                </CardContent>
            </Card>
        );
    }
}

export default SimplePetCard;

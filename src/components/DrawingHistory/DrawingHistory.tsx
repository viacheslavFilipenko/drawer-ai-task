import React from "react";
import { List, ListItem, Paper, Typography } from "@mui/material";
import { useDrawingContext } from "../../contexts/DrawingHistoryContext";

export const DrawingHistory = () => {
    const { lines } = useDrawingContext();

    return  <Paper elevation={3} sx={{ minWidth: 300 }}>
        <Typography variant="h4" textAlign="center">History</Typography>

        <List sx={{ height: 500, overflowY: "scroll" }}>
            <ListItem>Lines Drawn: {lines.length}</ListItem>

            {lines.map((line, index) => (
                <ListItem key={index}>{`Line ${index + 1} - points [${line.startX}, ${line.startY}, ${line.endX}, ${line.endY}]`}</ListItem>)
            )}
        </List>
    </Paper>
}
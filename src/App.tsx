import React from 'react';
import { CanvasSize } from "./common/enums/enums";
import { CANVAS_SIZE } from "./common/maps/maps";
import { SizeControls } from "./components/SizeControls/SizeControls";
import { CanvasWrapper } from "./components/CanvasWrapper/CanvasWrapper";
import { Box, Grid } from "@mui/material";
import { DrawingHistory } from "./components/DrawingHistory/DrawingHistory";
import { DrawingHistoryProvider } from "./contexts/DrawingHistoryContext";

function App() {
  const [currentSize, setCurrentSize] = React.useState(CanvasSize.Medium);

  const sizeDimensions = CANVAS_SIZE[currentSize];
  const handleSizeChange = (size: CanvasSize) => setCurrentSize(size);

  return (
      <DrawingHistoryProvider>
          <Box m={3} />
          <Grid container gap={1}>
              <Grid xs={9} item container justifyContent="center" alignItems="flex-start">
                  <SizeControls onSizeChange={handleSizeChange} size={currentSize} />
                  <CanvasWrapper width={sizeDimensions.width} height={sizeDimensions.height} />
              </Grid>
              <Grid item xs={2}>
                  <DrawingHistory />
              </Grid>
          </Grid>
      </DrawingHistoryProvider>
  );
}

export default App;

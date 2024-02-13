import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useCanvasDrawing } from "./hooks/useCanvasDrawing";

interface Props {
    width: number;
    height: number;
}

export const CanvasWrapper: React.FC<Props> = ({ width, height }) => {
    const { canvasRef, startDrawing, draw, stopDrawing } = useCanvasDrawing();

    return (
        <Grid container gap={1}>
            <Grid item xs={9} container justifyContent="center" alignItems="center" flexDirection="column">
                <Typography variant="h4" textAlign="center">Canvas</Typography>
                <canvas
                    data-testid="canvasDrawing"
                    ref={canvasRef}
                    style={{
                        border: '1px solid #000',
                        width: `${width}px`,
                        height: `${height}px`
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                />
            </Grid>
        </Grid>
    );
};

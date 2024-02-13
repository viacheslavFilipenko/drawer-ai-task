import React from "react";
import { CanvasSize } from "../../common/enums/enums";
import { Box, Button } from "@mui/material";

interface Props {
    onSizeChange: (size: CanvasSize) => void;
    size: CanvasSize;
}

const SIZES = [CanvasSize.Small, CanvasSize.Medium, CanvasSize.Large];
const SIZE_LABELS: Record<CanvasSize, string> = {
    [CanvasSize.Small]: "Small",
    [CanvasSize.Medium]: "Medium",
    [CanvasSize.Large]: "Large",
};

export const SizeControls = ({ onSizeChange, size }: Props) => {
    const renderButton = (canvasSize: CanvasSize) => (
        <Button
            key={canvasSize}
            variant="outlined"
            disabled={size === canvasSize}
            onClick={() => onSizeChange(canvasSize)}
        >
            {SIZE_LABELS[canvasSize]}
        </Button>
    );

    return (
        <Box display="flex" gap={1}>
            {SIZES.map(renderButton)}
        </Box>
    );
};

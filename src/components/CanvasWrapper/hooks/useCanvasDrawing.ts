import React, { useRef, useState, useEffect } from 'react';
import { useDrawingContext } from "../../../contexts/DrawingHistoryContext";
import { Line } from "../../../common/definitions/line";

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

export const useCanvasDrawing = () => {
    const { lines, addLine } = useDrawingContext();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
            }
        }
    }, []);

    const getScaleFactors = (canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        return {
            scaleX: canvas.width / rect.width,
            scaleY: canvas.height / rect.height,
        };
    };

    const drawLine = (ctx: CanvasRenderingContext2D, line: Line) => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();
        ctx.closePath();
    };

    const refreshCanvas = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        lines.forEach(line => drawLine(ctx, line));
    };

    const calculateAdjustedCoordinates = (event: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const scale = getScaleFactors(canvas);
        const { offsetX, offsetY } = event.nativeEvent;

        return {
            x: Math.round(offsetX * scale.scaleX),
            y: Math.round(offsetY * scale.scaleY),
        };
    };

    const adjustLineFor90Degrees = (start: { x: number; y: number }, end: { x: number; y: number }): { x: number; y: number } => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            return { x: end.x, y: start.y };
        } else {
            return { x: start.x, y: end.y };
        }
    };

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const coords = calculateAdjustedCoordinates(event);

        if (coords) {
            setStartPos(coords);
            setIsDrawing(true);
        }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !startPos) return;

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const coords = calculateAdjustedCoordinates(event);
        if (!coords) return;

        const adjustedCoords = adjustLineFor90Degrees(startPos, coords);
        refreshCanvas(ctx);
        drawLine(ctx, { startX: startPos.x, startY: startPos.y, endX: adjustedCoords.x, endY: adjustedCoords.y });
    };

    const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !startPos) return;

        const coords = calculateAdjustedCoordinates(event);

        if (coords) {
            const adjustedCoords = adjustLineFor90Degrees(startPos, coords);
            addLine({ startX: startPos.x, startY: startPos.y, endX: adjustedCoords.x, endY: adjustedCoords.y });
            setIsDrawing(false);
            setStartPos(null);
        }
    };

    return { canvasRef, startDrawing, draw, stopDrawing };
};

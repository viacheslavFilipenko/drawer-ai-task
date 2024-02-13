import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {useCanvasDrawing} from "./useCanvasDrawing";

const mockAddLine = jest.fn();

jest.mock('../../../contexts/DrawingHistoryContext', () => ({
    useDrawingContext: () => ({
        lines: [],
        addLine: (...args: unknown[]) => mockAddLine(...args),
    }),
}));

const TestComponent = () => {
    const { canvasRef, startDrawing, draw, stopDrawing } = useCanvasDrawing();

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            width="1200"
            height="800"
            data-testid="test-canvas"
        ></canvas>
    );
};

describe('useCanvasDrawing Hook', () => {
    beforeEach(() => {
        mockAddLine.mockClear();
    });

    it('initializes the canvas with correct dimensions', () => {
        render(<TestComponent />);
        const canvas = screen.getByTestId('test-canvas');
        expect(canvas).toBeInTheDocument();
        expect(canvas).toHaveAttribute('width', '1200');
        expect(canvas).toHaveAttribute('height', '800');
    });

    it('stops drawing on mouse up and calls addLine', () => {
        render(<TestComponent />);
        fireEvent.mouseDown(screen.getByTestId('test-canvas'), { clientX: 100, clientY: 100 });
        fireEvent.mouseUp(screen.getByTestId('test-canvas'));
        expect(mockAddLine).toHaveBeenCalled();
    });

    it('calls addLine with correct parameters after drawing', () => {
        render(<TestComponent />);
        fireEvent.mouseDown(screen.getByTestId('test-canvas'), { clientX: 100, clientY: 100 });
        fireEvent.mouseMove(screen.getByTestId('test-canvas'), { clientX: 150, clientY: 150 });
        fireEvent.mouseUp(screen.getByTestId('test-canvas'));
        expect(mockAddLine).toHaveBeenCalledWith({
            startX: expect.any(Number),
            startY: expect.any(Number),
            endX: expect.any(Number),
            endY: expect.any(Number),
        });
    });
});
